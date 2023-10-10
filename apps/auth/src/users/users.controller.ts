import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../../../../libs/common/src/decorators/current-user.decorator';
import { UsersDocument } from './models/users.schema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

   constructor(private readonly usersService: UsersService){}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        console.log('tesst')
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user: UsersDocument){
        return user;
    }

    @Get('all')
    async findAll(){
        return this.usersService.findAll();
    }
}
