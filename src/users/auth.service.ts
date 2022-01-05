import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {
        // 1. Check if the email exists
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email in use!');
        }

        // 2. Encrypt the password
        // 2.1 Generate a randon salt using randomBytes
        const salt = randomBytes(8).toString('hex');

        // 2.2 Generate the hash for password and salt using scrypt
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // 2.3 Combine hashed password with salt using (.)
        const result = `${salt}.${hash.toString('hex')}`;

        // 3. Save the email and the salted-hashed password
        const user = await this.usersService.create(email, result);

        return user;
    }

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // 1. Get the salt and hash of the stored password
        const [salt, storedHash] = user.password.split('.');

        // 2. Generated the hash using the supplied passed and stored salt
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // 3. Compare the new generated hash with the stored hash
        if (storedHash !== hash.toString('hex')) {
            throw new ForbiddenException('Invalid Password');
        }

        return user;
    }
}
