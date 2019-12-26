import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

export class GqlAuthGuard extends AuthGuard('jwt') {
  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

// tslint:disable-next-line: variable-name
export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
