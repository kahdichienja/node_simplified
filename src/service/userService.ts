
import { CreateUserDto } from "../utils";


export class UserService{

    async getUser(userDto: CreateUserDto): Promise<CreateUserDto>{
        console.log();
        return userDto;
    }
}