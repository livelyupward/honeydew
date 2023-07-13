import mongoose from 'mongoose';
import { User } from '../models/User.js';

export default {
  async getByEmail(req, res) {
    const email = req.params.email;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).send({ error: `No user found for email ${email}.` });
      }

      res.status(200).send(user);
    } catch (error) {
      return { error };
    }
  },

  async createUser(req, res) {
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
      });

      const savedUser = await newUser.save();

      res.status(201).send(savedUser);
    } catch (error) {
      return { error };
    }
  },

  async setActiveSpace(req, res) {
    try {
      const userId = req.params.id;
      const currentUser = await User.findOneAndUpdate({ _id: userId }, { activeSpace: req.body.spaceId });

      res.status(202).send(currentUser);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
