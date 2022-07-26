import { useCallback, useState } from "react"
import { CreateUser, User } from "../interfaces/iUser"
import { UserService } from "../services/UserService"

export const useUser = () => {
    const [users, setUsers] = useState<User[]>([])
    const getall = useCallback( async () => {
        const {status, data} = await UserService.getall();

        if (status !== 200)  throw new Error();

        setUsers(data);
    }, [])

    const createUser = useCallback( async (user: CreateUser) => {
        const {status, data} = await UserService.createUser(user);

        if (status !== 201)  throw new Error();

        setUsers(data);
    }, [])

    return {
        users,
        getall,
        createUser
    }
}