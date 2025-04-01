
import { Server } from "socket.io";
import http from "http";
import express from "express";
import { log } from "console";

const app = express();    //  This Server we built on node.js and express and we use them for our use having Rest API's.
const server = http.createServer(app);    //  This we create Server on top of app , that is use for real-time communication.


//  Here, this "io" is our final Socket Server the we will use ar everywhere by exporting it.

const io = new Server(server, {
    cors: {
        origin:["http://localhost:5173"]
    }
})

export function getReceiverSocketId(userId)  {
   return userSocketMap[userId];
}


//  used to store online users

const userSocketMap = {}   //  { userId : socketId }

io.on("connection" , (socket) => {
    console.log("A user Connected", socket.id);

    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id

    // io.emit() is used to send events to all the connected clients.
    io.emit("getOnlineUsers" , Object.keys(userSocketMap));

    socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers" , Object.keys(userSocketMap));
    });
});



export { io , app , server };