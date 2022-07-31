import { useCallback, useState } from 'react';
import { ExitRoom, JoinRoom, Room } from '../interfaces/iRoom';
import { RoomService } from '../services/RoomService';

export const useRoom = () => {
    const join = useCallback(async (join: JoinRoom) => {
        const { status, data } = await RoomService.joinRoom(join);

        if (status !== 201) throw new Error();

        return data;
    }, []);

    const getPlayers = useCallback(async (room_id: string | null) => {
        const { status, data } = await RoomService.getPlayers(room_id);

        if (status !== 200) throw new Error();

        return data;
    }, []);

    const exit = useCallback(async (exit: ExitRoom) => {
        const { status, data } = await RoomService.exitRoom(exit);

        if (status !== 200) throw new Error();

        return data;
    }, []);

    const getRoom = useCallback(async (room_id: string | null) => {
        const { status, data } = await RoomService.getRoom(room_id);

        if (status !== 200) throw new Error();

        return data;
    }, []);

    return {
        join,
        exit,
        getPlayers,
        getRoom,
    };
};
