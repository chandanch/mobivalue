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
    Session,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serializer } from '../interceptors/serializer.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import { UserDto } from './dtos/user.dto';
import { UserDetailsDTO } from './dtos/userDetails.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serializer(UserDetailsDTO)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    @Post('/signup')
    async createUser(@Body() body: UserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: UserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    // @Get('whoami')
    // whoAmI(@Session() session: any) {
    //     return this.usersService.findOne(session.userId);
    // }

    @Get('whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null;
        return 'User Signed Out';
    }

    // @Get('/colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any) {
    //     session.color = color;
    // }

    // @Get('/colors')
    // getColor(@Session() session: any) {
    //     return session.color;
    // }

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
