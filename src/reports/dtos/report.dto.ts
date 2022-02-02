import { Expose, Transform } from 'class-transformer';

export class ReportDTO {
    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    lat: number;

    @Expose()
    lng: number;

    @Expose()
    price: number;

    @Expose()
    mileage: number;

    @Expose()
    @Transform(({ obj }) => obj.user.id)
    userId: number;
}
