import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserDetailsDTO } from 'src/users/dtos/userDetails.dto';

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Rum some code before the request is handled by request handler(controller)
        console.log('Serializer Interceptor Handle incomming request');

        return next.handle().pipe(
            map((data: any) => {
                // Run some code before the response is sent out
                return plainToClass(UserDetailsDTO, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
