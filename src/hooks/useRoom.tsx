import { useCallback, useState } from 'react';
import { JoinRoom, Room } from '../interfaces/iRoom';
import { RoomService } from '../services/RoomService';

export const useRoom = () => {
    const join = useCallback(async (join: JoinRoom) => {
        const { status, data } = await RoomService.joinRoom(join);

        if (status !== 201) throw new Error();

        return data;
    }, []);

    return {
        join,
    };
};
