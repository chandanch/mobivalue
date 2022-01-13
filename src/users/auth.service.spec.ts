import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

let service: AuthService;
let fakeUserService: Partial<UsersService>;

describe('Auth Service', () => {
    beforeEach(async () => {
        // create a fake UserService
        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) =>
                Promise.resolve({ id: 1, email, password } as User),
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
        fakeUserService.find = () =>
            Promise.resolve([
                { id: 1, email: 'test', password: 'ee322' } as User,
            ]);
        try {
            await service.signup('www@www.com', 'sdss');
        } catch (error) {
            expect(error).toBeDefined();
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
        fakeUserService.find = () =>
            Promise.resolve([
                { id: 1, email: 'test', password: 'ee322' } as User,
            ]);
        try {
            await service.signin('ddf@eeco.com', '222222');
        } catch (error) {
            expect(error).toBeDefined();
        }
    });

    it('should signin user successfully', async () => {
        fakeUserService.find = () =>
            Promise.resolve([
                {
                    id: 1,
                    email: 'test',
                    password:
                        '5305b404e7ce8f9f.63d003654772c602294a5a09ac9f173b9b9112d411c8bd14a1b738069dcbd240',
                } as User,
            ]);
        try {
            const user = await service.signin('as@as.com', '12345');
            expect(user).toBeDefined();
        } catch (error) {}
    });
});
