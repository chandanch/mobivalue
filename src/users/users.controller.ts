import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { Serializer } from 'src/interceptors/serializer.interceptor';
import { AuthService } from './auth.service';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { UserDto } from './dtos/user.dto';
import { UserDetailsDTO } from './dtos/userDetails.dto';
import { UsersService } from './users.service';

@Controller('auth')
@Serializer(UserDetailsDTO)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    @Post('/signup')
    createUser(@Body() body: UserDto) {
        return this.authService.signup(body.email, body.password);
    }

    @Post('/signin')
    signin(@Body() body: UserDto) {
        return this.authService.signin(body.email, body.password);
    }

    //Approach 1:  @UseInterceptors(new SerializeInterceptor(UserDetailsDTO))
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
