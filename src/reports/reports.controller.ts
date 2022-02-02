import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { Serializer } from 'src/interceptors/serializer.interceptor';
import { ReportDTO } from './dtos/report.dto';

@Controller('reports')
export class ReportsController {
    constructor(private reportsService: ReportsService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serializer(ReportDTO)
    addReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }
}
