import { io } from "socket.io-client";

const SOCKET_URL = (import.meta.env.BACKEND_URL || "http://localhost:5000").replace(/\/$/, "")

export const initializeSocketConnection = () => {

    const socket = io(SOCKET_URL, {
        withCredentials: true,
    })

    socket.on("connect", () => {
        console.log("Connected to Socket.IO server")
    })

}