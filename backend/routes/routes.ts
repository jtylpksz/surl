import express from 'express';
import { connection } from '../db/connection';
import { randomBytes } from 'node:crypto';

export const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Welcome to SURL API!');
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT * FROM urls
    WHERE id = '${id}';
  `;

  connection.query(query, (error, results) => {
    if (error) {
      res.send('Error connecting to database');
    }
    res.send(results);

    // Checking if expiration date is in the past
    const selectQuery = `
      DELETE FROM urls
      WHERE expiration_date <= NOW();
    `;

    connection.query(selectQuery, (error, results) => {
      if (error) {
        console.error('Internal Error checking expiration date', error);
      } else {
        console.log(results);
      }
    });
  });
});

router.get('/urls', (_req, res) => {
  const query = 'SELECT * FROM urls;';

  connection.query(query, (error, results) => {
    if (error) {
      res.send('Error on query');
    }
    res.send(results);
  });
});

router.post('/addUrl', (req, res) => {
  const { url, userId }: { url: string; userId: string } = req.body;

  if (!url) {
    res.send('URL malformed or undefined');
  }

  const id = randomBytes(6).toString('hex');

  const currentDate = new Date();
  const expirationDate = new Date(currentDate);
  expirationDate.setDate(currentDate.getDate() + 60);
  const formattedExpirationDate = expirationDate
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  const query = `
    INSERT INTO urls (id, url, expiration_date, user_id)
    VALUES ('${id}', '${url}', '${formattedExpirationDate}', '${userId}');
  `;

  connection.query(query, (error: any) => {
    if (error) {
      console.error('Error /addUrl', error);
      res.send('Error on query');
    }
    res.json({
      ok: true,
      urlShortened: `http://localhost:3000/${id}`,
      message: 'Short URL Added',
    });
  });
});

router.get('/urlsByUser/:userId', (req, res) => {
  // Join between urls and users table

  const { userId } = req.params;

  const query = `
    SELECT * FROM urls
    INNER JOIN users ON urls.user_id = users.user_id
    WHERE user_id = '${userId}';
  `;

  connection.query(query, (error, results) => {
    if (error) {
      res.send('Error connecting to database');
    }
    res.send(results);
  });
});
