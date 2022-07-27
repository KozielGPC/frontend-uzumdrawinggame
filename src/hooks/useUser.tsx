import { useCallback, useState } from 'react';
import { Login, User } from '../interfaces/iUser';
import { UserService } from '../services/UserService';

export const useUser = () => {
    const getall = useCallback(async () => {
        const { status, data } = await UserService.getall();

        if (status !== 200) throw new Error();
        return data;
    }, []);

    const login = useCallback(async (user: Login) => {
        const { status, data } = await UserService.login(user);

        if (status !== 201) throw new Error();

        return data;
    }, []);

    return {
        getall,
        login,
    };
};
