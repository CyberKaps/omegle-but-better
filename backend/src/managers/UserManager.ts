import { Socket } from "socket.io";

let GLOBAL_ROOM_ID = 0;

interface User {
    socket: Socket;
    name: string
}


export class UserManager {
    private users: User[];
    private Queue: string[];
    constructor() {
        this.users = [];
        this.Queue = [];
    }
    addUser(name: string, socket: Socket) {
        this.users.push({
            name, socket
        })
        this.Queue.push(socket.id);
        this.clearQueue();
    }
    removeUser(socketId: string) {
        this.users = this.users.filter(x => x.socket.id === socketId);
        this.Queue = this.Queue.filter(x => x === socketId);
    }

    clearQueue() {
        if(this.Queue.length < 2) {
            return;
        }
        const user1 = this.users.find(x => x.socket.id === this.Queue.pop());
        const user2 = this.users.find(x => x.socket.id === this.Queue.pop());
        const roomId = this.generate();
        user1?.socket.emit("new-room", {
            type: "send-offer",
            roomId
        })
    }
    generate() {
        return GLOBAL_ROOM_ID++;
    }


}