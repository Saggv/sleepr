import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepositoty } from './users.repositoty';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {

    constructor(private readonly usersRepositoty: UsersRepositoty){}

    async createUser(createUserDto: CreateUserDto){
        await this.validateCreateUserDto(createUserDto);
        
        return this.usersRepositoty.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        });
    };

    async validateCreateUserDto(createUserDto: CreateUserDto){
        try{
            await this.usersRepositoty.findOne({email: createUserDto.email})
        }
        catch(err){
            return;
        };

        throw new UnprocessableEntityException('Email already exists')
    }

    async verifyUser(email: string, password: string){
        const user = await this.usersRepositoty.findOne({email});
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if(!passwordIsValid){
            throw new UnauthorizedException('Credentials are not valid')
        }
        return user;
    }

    async getUser(getUserDto: GetUserDto){
        return this.usersRepositoty.findOne(getUserDto);
    }
}
