import { Body, Controller, Post } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
    @Post()
    addReport(@Body() body: any) {}
}
