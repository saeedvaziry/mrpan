import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter<T> implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    if (
      !request.xhr &&
      request.headers.accept &&
      request.headers.accept.indexOf('json') <= 0
    ) {
      response.status(404).render('404', {
        title: process.env.APP_NAME + ' - Not Found',
      });
    } else {
      response.status(404).json(exception.getResponse());
    }
  }
}
