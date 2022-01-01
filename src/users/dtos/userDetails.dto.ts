import { Expose } from 'class-transformer';

export class UserDetailsDTO {
    @Expose()
    id: number;

    @Expose()
    email: string;
}
