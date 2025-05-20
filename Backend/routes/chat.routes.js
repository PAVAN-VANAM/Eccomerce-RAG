import express from 'express';
import { handleChatQuery } from '../controllers/chat.controller.js';


const  router = express.Router();

router.post('/', handleChatQuery);

export default router;
