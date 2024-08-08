import { User } from "../entities/user.entity";

export interface IUsersService {
    findAll(): Promise<User[]>;
    login(user: any): Promise<User>;
}