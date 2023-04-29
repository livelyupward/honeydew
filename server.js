import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import database from './models/index.js';

const app = Express();
const port = 4000;

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

try {
  database.sequelize.sync({ force: true }).then(() => console.log('Database connected successfully'));
} catch (error) {
  console.log('Connection to database failed', error);
}

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
