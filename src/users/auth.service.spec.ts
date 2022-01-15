import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

let service: AuthService;
let fakeUserService: Partial<UsersService>;
let users: User[];

describe('Auth Service', () => {
    beforeEach(async () => {
        users = [];
        // create a fake UserService
        fakeUserService = {
            find: (email: string) => {
                const filteredUser = users.filter(
                    (user) => user.email === email,
                );
                return Promise.resolve(filteredUser);
            },
            create: (email: string, password: string) => {
                const user = {
                    email,
                    password,
                    id: Math.floor(Math.random() * 999),
                } as User;
                users.push(user);
                return Promise.resolve(user);
            },
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: fakeUserService },
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it('should create an instance of Auth Service', async () => {
        expect(service).toBeDefined();
    });

    it('create a new user with hashed password', async () => {
        const user = await service.signup('www@www.com', 'sddss');
        expect(user.password).not.toEqual('sddss');

        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('should throw error if email exists', async () => {
        await service.signup('ww22w@www.com', 'sdss');
        try {
            await service.signup('www@www.com', 'sdss');
        } catch (error) {
            expect(error.message).toEqual('Email in use!');
        }
    });

    it('should throw error if user does not exits when signin', async () => {
        try {
            await service.signin('tt@tt.com', 'e3333');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should throw error if password does not match', async () => {
        await service.signup('www@www.com', 'sdss');
        try {
            const user = await service.signin('www@www.com', 'sdss');
        } catch (error) {
            console.log('##ERROR', error);
            expect(error).toBeTruthy();
        }
    });

    it('should signin user successfully', async () => {
        await service.signup('as@as.com', '12345');
        const user = await service.signin('as@as.com', '12345');
        expect(user).toBeDefined();
    });
});
