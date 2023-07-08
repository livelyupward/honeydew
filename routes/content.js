import express from 'express';
const router = express.Router();

import ContentController from '../controllers/contentController.js';

router.get('/:id', ContentController.getAllForSpace);
router.get('/single/:id', ContentController.getById);
router.put('/single/:id', ContentController.editById);
router.post('/', ContentController.createContentItem);

export default router;
