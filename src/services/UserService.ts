import { Login, User } from "../interfaces/iUser"
import api from "../providers"


const getall = () => api.get<User[]>('/user')

const login = (user: Login) => api.post<User>('/user', user);

export const UserService ={
    login,
    getall
}