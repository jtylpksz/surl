import express from 'express';
import { connection } from '../db/connection';
import { randomBytes } from 'node:crypto';
import { encrypt } from '../utils/security/encrypt';
import { decrypt } from '../utils/security/decrypt';

export const routerAuth = express.Router();

interface authData {
  username: string;
  password: string;
}

interface resultsData {
  ok: boolean;
  username: string;
  password: string;
  userId: string;
}

routerAuth.post('/login', (req, res) => {
  const { username, password }: authData = req.body;

  if (!username || !password) {
    res.send('Username or password malformed or undefined');
  }

  const query = `
    SELECT * FROM users
    WHERE username = ?;
  `;

  connection.query(query, [username], (error, results: resultsData[] | any) => {
    if (error) {
      console.error(error);
      res.send('Error connecting to database');
    }

    // get password from db, decrypt it and compare with the original password

    if (results.length === 0) {
      res.send({ ok: false, message: 'Username not found' })
    }

    const encryptedPassword = results[0].password;
    const decryptedPassword = decrypt(encryptedPassword);

    if (password !== decryptedPassword.message) {
      return res.send({ ok: false, message: 'Wrong password' });
    }

    res.send({
      ok: true,
      username: results[0].username,
      userId: results[0].user_id,
    });
  });
});

routerAuth.post('/signup', (req, res) => {
  const { username, password }: authData = req.body;

  if (!username || !password) {
    res.send('Username or password malformed or undefined');
  }

  if (password.length < 8) {
    res.send('Password must be more than 8 eight characters');
  }

  const userId = randomBytes(6).toString('hex');

  const encryptedPassword = encrypt(password);
  const query = `
    INSERT INTO users (username, password, user_id)
    VALUES (?, ?, ?);
  `;

  const values = [username, encryptedPassword, userId];

  connection.query(query, values, (error: any) => {
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.send({ ok: false, message: 'Username already exists' });
    }

    if (error) {
      console.error(error);
      return res.send('Error connecting to database');
    }

    res.send({ ok: true, username, userId });
  });
});

routerAuth.put('/changePassword', (req, res) => {
  const { userId, currentPassword, newPassword }: {
    userId: string,
    currentPassword: string,
    newPassword: string
  } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.send({ ok: false, message: 'Username or password malformed or undefined' });
  }

  if (newPassword.length < 8) {
    return res.send({ ok: false, message: 'Password must be more than 8 characters' });
  }

  // get user
  const query = `
    SELECT username, password, user_id FROM users WHERE user_id = ?;
  `

  connection.query(query, [userId], (error: any) => {
    if (error) {
      console.error(error);
      return res.send('Error connecting to database');
    }

    // update data
    const query = `
      UPDATE users SET password = ? WHERE user_id = ?;
    `
    const newEncryptedPassword = encrypt(newPassword);

    connection.query(query, [newEncryptedPassword, userId], (error: any) => {
      if (error) {
        console.error(error);
        return res.send('Error connecting to database');
      }

      res.send({ ok: true, message: 'Password updated successfully' });
    })
  });
});

routerAuth.delete('/deleteAccount', (req, res) => {
  const { userId, userPassword } = req.body;

  if (!userId || !userPassword) {
    return res.send({ ok: false, message: 'ID or password malformed or undefined' });
  }

  // get user
  const query = `
    SELECT username, password, user_id FROM users WHERE user_id = ?;
  `

  connection.query(query, [userId], (error: any, results: any) => {
    if (error) {
      console.error(error);
      return res.send('Error connecting to database');
    }

    const decryptedPassword = decrypt(results[0].password)?.message

    if (decryptedPassword !== userPassword) {
      return res.send({ ok: false, message: 'Passwords do not match' });
    }

    const query = `
      DELETE FROM users WHERE user_id = ?;
    `

    // Delete user
    connection.query(query, [userId], (error: any) => {
      if (error) {
        console.error(error);
        return res.send('Error connecting to database');
      }

      res.send({ ok: true, message: 'Account deleted successfully' });
    })
  });
})