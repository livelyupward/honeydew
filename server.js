import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import database from './database.js';
import { OAuth2Client } from 'google-auth-library';

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

app.post('/api/auth/callback', (req, res) => {
  const token = req.query.cred;
  let userToSend;

  const client = new OAuth2Client(process.env.GOOGLE_CLIENTID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENTID,
    });
    const payload = ticket.getPayload();
    const userid = (userToSend = payload);
  }
  verify()
    .then(() => {
      return res.send(userToSend);
    })
    .catch((error) => {
      return res.status(403).send({ error });
    });
});

app.post('/api/auth/verify', (req, res) => {});

app.use('/api/spaces', spaceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);

app.listen(port, () => {
  console.log(`express running at http://localhost:${port}`);
});
