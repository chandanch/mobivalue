import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    /**
     * Creates an user entity instance and saves that entity instance in database.
     * @param email string
     * @param password string
     * @returns
     */
    async create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        const status = await this.repo.save(user);
        return status;
    }
}
