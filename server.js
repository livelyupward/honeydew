import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import database from './database.js';

const app = Express();
const port = 4000;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

try {
  await database();
  console.log('db connected');
} catch (error) {
  console.log(error);
}

import spaceRoutes from './routes/spaces.js';
import userRoutes from './routes/users.js';
import contentRoutes from './routes/content.js';

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/spaces', spaceRoutes);
app.use('/users', userRoutes);
app.use('/content', contentRoutes);

app.listen(port, () => {
  console.log(`express running at http://localhost:${port}`);
});
