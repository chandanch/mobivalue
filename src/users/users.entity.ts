import { Exclude } from 'class-transformer';
import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logUserCreate() {
        console.log(`User Created: ${this.id}`);
    }

    @AfterUpdate()
    logUserUpdate() {
        console.log(`User Updated: ${this.id}`);
    }

    @AfterRemove()
    logUserRemove() {
        console.log(`User removed: ${this.id}`);
    }
}
