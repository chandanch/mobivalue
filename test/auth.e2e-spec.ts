import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { AppModule } from '../src/app.module';

describe('Authentication System (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should signup user', async () => {
        const email = 'gilper@ee.com';
        const res = await request(app.getHttpServer())
            .post('/auth/signup')
            .send({ email: email, password: 'w2222' })
            .expect(201);
        const user = res.body;
        expect(user.id).toBeDefined();
        expect(user.email).toEqual(email);
    });
});
