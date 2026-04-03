import { Router } from 'express';
import { sendMessage, getMessages, getChats, deleteChat } from '../controller/chat.controller.js';
import { authUser } from '../middleware/auth.middelware.js';
const chatRouter = Router();


chatRouter.post("/message",authUser, sendMessage);

chatRouter.get("/", authUser, getChats);

chatRouter.get("/:chatId/messages", authUser, getMessages);

chatRouter.delete("/delete/:chatId", authUser, deleteChat);


export default chatRouter;