import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    protected readonly logger = new Logger(LocalAuthGuard.name);

    canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        return super.canActivate(new ExecutionContextHost([req]));
    }

    handleRequest(err: any, user: any) {
        if (err) {
        this.logger.error(`Auth Error! ${err.message}`);
        throw err;
        }

        if (!user) {
            this.logger.error('Auth Error! User not found');
            throw new HttpException('Invalid token',HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}