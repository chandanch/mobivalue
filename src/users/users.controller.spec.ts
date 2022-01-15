import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let fakeAuthService: Partial<AuthService>;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        fakeAuthService = {
            signin: (email: string, password: string) => {
                return Promise.resolve({ id: 1, email, password } as User);
            },
            // signup: () => {},
        };

        fakeUserService = {
            findOne: (id: number) => {
                return Promise.resolve({
                    id,
                    email: 'dd@ee.com',
                    password: 'weew',
                } as User);
            },
            find: (email: string) => {
                return Promise.resolve([
                    {
                        email,
                        id: 1,
                        password: 'dddd',
                    } as User,
                ]);
            },
            // remove: () => {},
            // update: () => {},
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                },
                {
                    provide: AuthService,
                    useValue: fakeAuthService,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return users that match the given email', async () => {
        const users = await controller.findUsers('ass@as.com', 'fee');
        expect(users.length).toBe(1);
    });

    it('should return user based on the user ID', async () => {
        const user = await controller.findUser('2');
        expect(user).toBeDefined();
    });

    it('should signin user and update session object', async () => {
        const session = { userId: -9999999 };

        const user = await controller.signin(
            { email: 'dddd@dd.com', password: 'ssss' },
            session,
        );

        expect(user.id).toBe(1);
        expect(session.userId).toBe(1);
    });
});
