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
      let space;

      if (req.query.content !== 'yes') {
        space = await Space.findById(id);
      } else {
        space = await Space.findById(id).populate('content');
      }

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

      res.status(201).send(savedSpace);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async updateSpaceContentById(req, res) {
    const id = req.params.id;

    try {
      const space = await Space.findByIdAndUpdate(id, { content: req.body.content });

      res.status(201).send(space);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
