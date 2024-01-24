import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { connection } from './db/connection';
import { router as routes } from './routes/routes';

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(json());
app.use(helmet());
app.use(morgan('dev'));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use('/api', routes);

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to DB. Aborting...');
    console.error(error);
    return connection.end();
  }

  const query = `
    CREATE TABLE IF NOT EXISTS urls (
      id VARCHAR(255) NOT NULL PRIMARY KEY,
      url VARCHAR(255) NOT NULL
    );
  `;

  connection.query(query, (error) => {
    if (error) {
      console.error('Error creating urls table.');
      console.error(error);
      return connection.end();
    }
    console.info('urls table created or already exists.');
  });

  app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
});
