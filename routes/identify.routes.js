import express from 'express';
import { identifyContact } from '../controllers/identify.controller.js';

const router = express.Router();

router.post('/identify', identifyContact);

export default router;
