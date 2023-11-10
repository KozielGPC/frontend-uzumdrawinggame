import { useCallback } from 'react';
import { Login, Logoff } from '../interfaces/iUser';
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

    const logoff = useCallback(async (user: Logoff) => {
        const { status, data } = await UserService.logoff(user);

        if (status !== 200) throw new Error();

        return data;
    }, []);

    const getUser = useCallback(async (user_id: string | null) => {
        const { status, data } = await UserService.getUser(user_id);

        if (status !== 200) throw new Error();

        return data;
    }, []);

    return {
        getall,
        login,
        logoff,
        getUser,
    };
};
