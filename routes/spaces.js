import express from 'express';
const router = express.Router();

import SpaceController from '../controllers/spaceController.js';

router.get('/', SpaceController.getAll);
router.get('/:id', SpaceController.getById);
router.post('/', SpaceController.createSpace);
router.put('/:id', SpaceController.updateSpaceContentById);

export default router;
