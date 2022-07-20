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

const users = require('./routes/users');
const lists = require('./routes/lists');

require('./models/List');
require('./models/User');
const List = mongoose.model('lists');
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

// app.get('/lists/:email', async (req, res) => {
//   try {
//     const email = req.params.email;
//     const loggedUser = await User.findOne({ email });
//     const lists = await List.find({ user: loggedUser._id });
//
//     return res.status(200).json(lists);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

app.post('/list/make', (req, res) => {
  const { title, category, user } = req.body;

  const newList = new List({
    listTitle: title,
    category,
    user,
  });

  newList
    .save()
    .then((createListResponse) => {
      console.log('List created successfully.');
      res.status(201).json(createListResponse.data);
    })
    .catch((err) => res.status(500).json(err));
});

// TODO: refactor adding todo to list
app.put('/list/:id/update', (req, res) => {
  List.findOne({ _id: req.params.id })
    .then((list) => {
      list.todos.push({
        ...req.body,
        comments: [],
        complete: false,
      });

      list.save().then((response) => {
        console.log('we saved the list!');
        res.status(204).json(response);
      });
    })
    .catch((err) => res.status(400).json(err));
});

app.use('/lists', lists);
app.use('/users', users);

app.listen(port, (req, res) => {
  console.log(`Server running at port ${port}`);
});
