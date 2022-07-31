import { useCallback, useState } from 'react';
import { CreateMatch } from '../interfaces/iMatch';
import { MatchService } from '../services/MatchService';

export const useMatch = () => {
    const createMatch = useCallback(async (input: CreateMatch) => {
        const { status, data } = await MatchService.createMatch(input);

        if (status !== 201) throw new Error();

        return data;
    }, []);

    return {
        createMatch,
    };
};
