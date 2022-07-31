import { useCallback, useState } from 'react';
import { CreateRound } from '../interfaces/iRound';
import { RoundService } from '../services/RoundService';

export const useRound = () => {
    const createRound = useCallback(async (input: CreateRound) => {
        const { status, data } = await RoundService.createRound(input);

        if (status !== 201) throw new Error();

        return data;
    }, []);

    return {
        createRound,
    };
};
