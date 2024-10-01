import { LoginDTO } from "../dtos/user/login.dto";
import { RegisterUserDTO } from "../dtos/user/register-user.dto";
import { User } from "../models/IUser";

export interface IAccessManager {
    register({ email, password, phone }): Promise<{userId: string}>;
    login({ email, password }: LoginDTO): Promise<string>;
    getUser(userId: string): Promise<User>;
    verifyToken(token: string): Promise<User>;
    refreshToken(token: string): Promise<{accessToken: string, refreshToken: string}>;
}