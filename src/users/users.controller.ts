import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serializer.interceptor';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/signup')
    createUser(@Body() body: UserDto) {
        return this.usersService.create(body.email, body.password);
    }

    @UseInterceptors(SerializeInterceptor)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('Handling request in controller');
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User Not Found in us');
        }
        console.log(user);
        return user;
    }

    @Get()
    findUsers(@Query('email') email: string, @Query('status') status: string) {
        console.log(status);
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
        console.log('In ctrl', body);
        return this.usersService.update(Number(id), body);
    }
}
