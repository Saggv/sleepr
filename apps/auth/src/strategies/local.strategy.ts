import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "../users/users.service";

@Injectable()
export class LocalStrategry extends PassportStrategy(Strategy){
    constructor(private readonly userService: UsersService){
        super({ usernameField: 'email' })
    };

    async validate(email: string, password: string){
        try{
            return this.userService.verifyUser(email, password);
        }catch(err){
            throw new UnauthorizedException(err);
        }
    }
}