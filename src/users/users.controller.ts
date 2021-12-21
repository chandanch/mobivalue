import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
export class UsersController {
    @Post('/signup')
    createUser(@Body() body: UserDto) {
        return { ...body, status: 'USer Created' };
    }
}
