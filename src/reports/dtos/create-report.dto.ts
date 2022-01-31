import {
    IsLatitude,
    IsLongitude,
    IsNumber,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateReportDTO {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2022)
    year: number;

    @IsLongitude()
    lat: number;

    @IsLatitude()
    lng: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    price: number;

    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
}
