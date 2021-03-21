import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from './auth.entity';

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Auth => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
