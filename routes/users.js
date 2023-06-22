import express from 'express';
const router = express.Router();

import UserController from '../controllers/userController.js';

router.get('/:email', UserController.getByEmail);
router.post('/', UserController.createUser);
router.put('/active-space/:id', UserController.setActiveSpace);
export default router;
