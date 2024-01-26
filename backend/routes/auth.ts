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

routerAuth.post('/login', (req, res) => {
  const { username, password }: authData = req.body;

  if (!username || !password) {
    res.send('Username or password malformed or undefined');
  }

  const decryptedPassword = decrypt(password);

  const query = `
    SELECT * FROM users
    WHERE username = '${username} AND password = '${decryptedPassword}';
  `;

  connection.query(query, (error) => {
    if (error) {
      console.error(error);
      res.send('Error connecting to database');
    }
    res.send({ ok: true, userId: '' });
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
    VALUES ('${username}', '${encryptedPassword}', '${userId}');
  `;

  connection.query(query, (error) => {
    if (error) {
      console.error(error);
      res.send('Error connecting to database');
    }
    res.send({ ok: true, userId });
  });
});
