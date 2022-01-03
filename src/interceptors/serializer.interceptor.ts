import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
    new (...args: any[]): {};
}

export function Serializer(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Rum some code before the request is handled by request handler(controller)
        console.log('Serializer Interceptor Handle incomming request');

        return next.handle().pipe(
            map((data: any) => {
                // Run some code before the response is sent out
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
