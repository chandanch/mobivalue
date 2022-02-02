import { Exclude } from 'class-transformer';
import { Reports } from 'src/reports/reports.entity';
import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Column,
    Entity,
    OneToMany,
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

    @OneToMany(() => Reports, (report) => report.user)
    reports: Reports[];

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
