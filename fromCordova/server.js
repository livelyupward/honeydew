const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = 4000;

const dbCredentials = {
  username: 'db_admin',
  password: 'G2gpiOD36YqHihJM',
};

require('./models/TodoList');
const TodoList = mongoose.model('todoLists');

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${dbCredentials.username}:${dbCredentials.password}@cluster0.aqgwvdc.mongodb.net/honeydew?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('Db connected'))
  .catch((err) => console.log('ERR: ', err));

app.get('/', (req, res) => {
  res.status(200).send('Hello cruel world.');
});

app.get('/lists', async (req, res) => {
  const lists = await TodoList.find();

  return res.status(200).json(lists);
});

app.put('/list/make', (req, res) => {
  console.log('req: ', req.body);
});

app.listen(port, (req, res) => {
  console.log(`Server running at port ${port}`);
});
