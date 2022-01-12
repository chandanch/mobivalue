import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('should create an instance of Auth Service', async () => {
    // create a fake UserService
    const fakeUserService = {
        find: () => Promise.resolve([]),
        create: (email: string, password: string) =>
            Promise.resolve({ id: 1, email, password }),
    };

    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            { provide: UsersService, useValue: fakeUserService },
        ],
    }).compile();

    const service = module.get(AuthService);

    expect(service).toBeDefined();
});
