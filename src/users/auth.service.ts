import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // 1. Check if the email exists
        const users = await this.usersService.find(email);
        if (!users.length) {
            throw new BadRequestException('Email in use!');
        }
    }

    signin() {}
}
