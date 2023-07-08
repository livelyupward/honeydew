import mongoose from 'mongoose';
import { ContentItem } from '../models/ContentItem.js';

export default {
  async getAllForSpace(req, res) {
    try {
      const spaceId = req.params.id;
      const contentItems = await ContentItem.find({ spaceId });

      res.status(200).send(contentItems);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const id = req.params.id;
      const contentItem = await ContentItem.findById(id);

      res.status(200).send(contentItem);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async createContentItem(req, res) {
    try {
      const newContentItem = new ContentItem({
        text: req.body.text,
        type: req.body.type,
        userId: req.body.userId,
        spaceId: req.query.spaceid ? req.query.spaceid : null,
      });

      const savedContentItem = await newContentItem.save();

      res.status(201).send({ contentItem: savedContentItem });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async editById(req, res) {
    const id = req.body._id;

    try {
      const editContent = await ContentItem.findByIdAndUpdate(id, { text: req.body.text });

      res.status(201).send(editContent);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
