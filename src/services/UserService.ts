import { Login, Logoff, User } from '../interfaces/iUser';
import api from '../providers';

const getall = () => api.get<User[]>('/user');

const login = (user: Login) => api.post<User>('/user', user);

const logoff = (user: Logoff) => api.patch<User>(`/user`, user);

export const UserService = {
    login,
    logoff,
    getall,
};
