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

    findOne(id: number) {
        return this.repo.findOne(id);
    }

    find(email: string) {
        return this.repo.find({ email });
    }

    async update(id: number, attrs: Partial<User>) {
        // get the user entity first
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User Not Found');
        }
        // copy all the properties and values from attrs using Object.Assign()
        Object.assign(user, attrs);

        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User Not Found');
        }

        return this.repo.remove(user);
    }
}
