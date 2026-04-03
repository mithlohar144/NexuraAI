import { io } from "socket.io-client";
import dotenv from "dotenv";
dotenv.config()

export const initializeSocketConnection = () => {

    const socket = io(process.env.BACKEND_URL, {
        withCredentials: true,
    })

    socket.on("connect", () => {
        console.log("Connected to Socket.IO server")
    })

}