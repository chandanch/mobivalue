import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> {
        // Rum some code before the request is handled by request handler(controller)
        console.log('Serializer Interceptor Handle incomming request');

        return next.handle().pipe(
            map((data: any) => {
                // Run some code before the response is sent out
                console.log(
                    'Serializer Interceptor: Handling response data before send it out',
                );
            }),
        );
    }
}
