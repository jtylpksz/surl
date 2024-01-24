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
  const { url } = req.body;

  const id = randomBytes(16).toString('hex');
  const query = `
    INSERT INTO urls (id, url)
    VALUES ('${id}', '${url}');
  `;

  connection.query(query, (error) => {
    if (error) {
      res.send('Error on query');
    }
    res.json({
      ok: true,
      urlShortened: `http://localhost:3000/${id}`,
      msg: 'Short URL Added',
    });
  });
});
