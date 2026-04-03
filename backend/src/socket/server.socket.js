
import {Server} from 'socket.io'
import http from 'http'

let io;
export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });
    console.log("socket Io server is running")

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id)

    })

}

export function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized")
    }
    return io;
}