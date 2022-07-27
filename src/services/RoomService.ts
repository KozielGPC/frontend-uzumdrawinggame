import { ExitRoom, JoinRoom, Room, RoomPlayers, RoomResponse } from '../interfaces/iRoom';
import api from '../providers';

const joinRoom = (join: JoinRoom) => api.post<RoomResponse>('/room', join);

const getPlayers = (room_id: string) => api.get<RoomPlayers>(`/room/${room_id}`);

const exitRoom = (exit: ExitRoom) => api.patch<Room>(`/room`, exit);

export const RoomService = {
    joinRoom,
    exitRoom,
    getPlayers,
};
