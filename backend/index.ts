import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { connection } from './db/connection';
import { router as routes } from './routes/routes';
import { routerAuth as routesAuth } from './routes/auth';

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
app.use('/auth', routesAuth);

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to DB. Aborting...');
    console.error(error);
    return connection.end();
  }

  const query1 = `
    CREATE TABLE IF NOT EXISTS urls (
      id VARCHAR(255) NOT NULL PRIMARY KEY,
      url VARCHAR(255) NOT NULL,
      expiration_date DATETIME NOT NULL,
      user_id VARCHAR(255)
    );
  `;
  
  const query2 = `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      user_id VARCHAR(255)
    );
  `;
  
  connection.query(query1, (error1) => {
    if (error1) {
      console.error('Error creating urls table.');
      console.error(error1);
      return connection.end();
    }
    console.info('urls table created or already exists.');
    
    connection.query(query2, (error2) => {
      if (error2) {
        console.error('Error creating users table.');
        console.error(error2);
        return connection.end();
      }
      console.info('users table created or already exists.');
    });
  });
  app.listen(PORT);
  console.log(`Server running on http://localhost:${PORT}`);
});
