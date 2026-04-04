import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js";
import mongoose from "mongoose";

export async function sendMessage(req, res) {

    const { message, chat: chatId } = req.body;


    if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
            message: "Message is required",
            success: false,
            err: "Message is required",
        })
    }

    let title = null;
    let chat = null;

    if (chatId) {
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({
                message: "Invalid chatId",
                success: false,
                err: "Invalid chatId",
            })
        }

        chat = await chatModel.findOne({
            _id: chatId,
            user: req.user.id,
        })

        if (!chat) {
            return res.status(404).json({
                message: "Chat not found",
                success: false,
                err: "Chat not found",
            })
        }
    } else {
        title = await generateChatTitle(message);
        chat = await chatModel.create({
            user: req.user.id,
            title,
        })
    }

    await messageModel.create({
        chat: chat._id,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({ chat: chat._id })

    const result = await generateResponse(messages);

    const aiMessage = await messageModel.create({
        chat: chat._id,
        content: result,
        role: "ai"
    })

    res.status(201).json({
        title,
        chat,
        aiMessage
    })

}

export async function getChats(req, res) {
    const user = req.user

    const chats = await chatModel.find({ user: user.id })

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

export async function getMessages(req, res) {
    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({
            message: "Invalid chatId",
            success: false,
            err: "Invalid chatId",
        })
    }

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}

export async function deleteChat(req, res) {

    const { chatId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({
            message: "Invalid chatId",
            success: false,
            err: "Invalid chatId",
        })
    }

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}