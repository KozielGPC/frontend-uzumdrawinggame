import { JoinRoom, Room } from "../interfaces/iRoom";
import api from "../providers"


const joinRoom = (join: JoinRoom) => api.post<Room>('/room', join);

export const RoomService ={
    joinRoom,
}