import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";



export interface User {
    socket: Socket;
    name: string
}


export class UserManager {
    private users: User[];
    private Queue: string[];
    private roomManager: RoomManager
    constructor() {
        this.users = [];
        this.Queue = [];
        this.roomManager = new RoomManager();
    }
    addUser(name: string, socket: Socket) {
        this.users.push({
            name, socket
        })
        this.Queue.push(socket.id);
        socket.send("lobby");
        this.clearQueue();
        this.initHandlers(socket);
    }

    removeUser(socketId: string) {
        const user = this.users.find(x => x.socket.id == socketId);
        if (!user) {

        }
        this.users = this.users.filter(x => x.socket.id !== socketId);
        this.Queue = this.Queue.filter(x => x === socketId);
    }

    clearQueue() {
        if(this.Queue.length < 2) {
            return;
        }

        const id1 = this.Queue.pop()
        const id2 = this.Queue.pop();
        const user1 = this.users.find(x => x.socket.id === id1 );
        const user2 = this.users.find(x => x.socket.id === id2);

        if (!user1 || !user2){
            return;
        }
        const room = this.roomManager.createRoom(user1,user2);
        this.clearQueue();
        
    }
    initHandlers(socket: Socket) {
        socket.on("offer", ({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onOffer(roomId, sdp)
        })

        socket.on("answer", ({sdp, roomId}: {sdp: string, roomId: string}) => {
            this.roomManager.onAnswer(roomId, sdp)
        })
    }


}