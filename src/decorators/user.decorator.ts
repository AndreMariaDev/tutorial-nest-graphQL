import { ExecutionContext, createParamDecorator, Body } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';


// export const CurrentUser = createParamDecorator((data, [root, args, ctx, info]) => ctx.req.user);


export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const ctx = GqlExecutionContext.create(context);
      let result = ctx.getContext().req.user;
      return result;
    },
);

// export const CurrentUser = createParamDecorator(
//     (data: unknown, context: ExecutionContext) => {
//       const ctx = GqlExecutionContext.create(context);
//       let result = ctx.getContext().req.Body;
//       return result;
//     },
// );