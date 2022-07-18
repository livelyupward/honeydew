const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

const port = 4000;

const dbCredentials = {
  username: 'db_admin',
  password: 'G2gpiOD36YqHihJM',
};

require('./models/TodoList');
require('./models/User');
const TodoList = mongoose.model('todoLists');
const User = mongoose.model('users');

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

app.post('/login', (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const avatar = req.body.avatar;

  User.findOne({ email })
    .then((user) => {
      console.log("we're here");
      if (!user) {
        const newUser = new User({
          name,
          email,
          avatar,
          activeList: null,
        });

        newUser
          .save()
          .then((response) => {
            return res.status(201).json({ message: 'User created successfully.', ...response });
          })
          .catch((error) => res.status(400).json({ error }));
      }

      res.status(200).json({ ...user, avatar });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

app.get('/lists/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const loggedUser = await User.findOne({ email });
    const lists = await TodoList.find({ user: loggedUser._id });

    return res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.put('/list/make', (req, res) => {
  console.log('req: ', req.body);
});

app.get('/user/:email', (req, res) => {
  User.findOne({ email: req.params.email }).then((user) => {
    res.status(200).json(user);
  });
});

app.listen(port, (req, res) => {
  console.log(`Server running at port ${port}`);
});
