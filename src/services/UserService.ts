import { CreateUser, User } from "../interfaces/iUser"
import api from "../providers"


const getall = () => api.get<User[]>('/user')

const createUser = (user: CreateUser) => api.post('/user', user);

export const UserService ={
    createUser,
    getall
}