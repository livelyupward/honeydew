import mongoose from 'mongoose';
import { Space } from '../models/Space.js';

export default {
  async getAll(req, res) {
    try {
      const spaces = await Space.find();

      res.status(200).send(spaces);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const space = await Space.findById(id);

      res.status(200).send(space);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async createSpace(req, res) {
    try {
      const newSpace = new Space({
        title: req.body.title,
        userId: req.body.userId,
      });

      const savedSpace = await newSpace.save();

      res.status(201).send({ space: savedSpace });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
