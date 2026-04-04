import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import { setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages, removeChat } from "../chat.slice";
import { useDispatch } from "react-redux";


export const useChat = () => {

    const dispatch = useDispatch()


    async function handleSendMessage({ message, chatId }) {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await sendMessage({ message, chatId })
            const { chat, aiMessage } = data
            const resolvedChatId = chatId || chat?.id || chat?._id
            if (!resolvedChatId) {
                throw new Error("Missing chat id")
            }
            if (!chatId)
                dispatch(createNewChat({
                    chatId: resolvedChatId,
                    title: chat?.title || "New Chat",
                }))
            dispatch(addNewMessage({
                chatId: resolvedChatId,
                content: message,
                role: "user",
            }))
            dispatch(addNewMessage({
                chatId: resolvedChatId,
                content: aiMessage.content,
                role: aiMessage.role,
            }))
            dispatch(setCurrentChatId(resolvedChatId))
        } catch (error) {
            const status = error?.response?.status
            if (status === 401) {
                dispatch(setError("Session expired. Please log in again."))
            } else {
                dispatch(setError(error?.response?.data?.message || "Failed to send message"))
            }
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetChats() {
        try {
            dispatch(setLoading(true))
            dispatch(setError(null))
            const data = await getChats()
            const { chats } = data
            dispatch(setChats(chats.reduce((acc, chat) => {
                const chatId = chat?.id || chat?._id
                if (!chatId) return acc
                acc[ chatId ] = {
                    id: chatId,
                    title: chat.title,
                    messages: [],
                    lastUpdated: chat.updatedAt,
                }
                return acc
            }, {})))
        } catch (error) {
            const status = error?.response?.status
            if (status === 401) {
                dispatch(setError("Please log in to view your chats."))
            } else {
                dispatch(setError(error?.response?.data?.message || "Failed to load chats"))
            }
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleOpenChat(chatId, chats) {

        console.log(chats[chatId]?.messages.length)

        if (!chatId) {
            dispatch(setError("Invalid chat id"))
            return
        }

        try {
            if (chats[ chatId ]?.messages.length === 0) {
                const data = await getMessages(chatId)
                const { messages } = data

                const formattedMessages = messages.map(msg => ({
                    content: msg.content,
                    role: msg.role,
                }))

                dispatch(addMessages({
                    chatId,
                    messages: formattedMessages,
                }))
            }
            dispatch(setCurrentChatId(chatId))
        } catch (error) {
            const status = error?.response?.status
            if (status === 401) {
                dispatch(setError("Please log in to open this chat."))
            } else {
                dispatch(setError(error?.response?.data?.message || "Failed to load messages"))
            }
        }
    }

    async function handleDeleteChat(chatId) {
        try {
            dispatch(setLoading(true))
            if (!chatId) {
                throw new Error("Invalid chat id")
            }
            await deleteChat(chatId)
            dispatch(removeChat(chatId))
            dispatch(setCurrentChatId(null))
        } catch (error) {
            dispatch(setError(error?.response?.data?.message || "Failed to delete chat"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    function handleNewThread() {
        dispatch(setCurrentChatId(null))
        dispatch(setError(null))
    }
    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleDeleteChat,
        handleNewThread,
    }

}