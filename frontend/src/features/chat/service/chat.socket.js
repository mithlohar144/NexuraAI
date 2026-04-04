import { io } from "socket.io-client";

const SOCKET_BASE_URL =
    import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_API_BASE_URL || 'https://nexuraai.onrender.com'
  

export const initializeSocketConnection = () => {

    const socket = io(SOCKET_BASE_URL, {
        withCredentials: true,
    })

    socket.on("connect", () => {
        console.log("Connected to Socket.IO server")
    })

}