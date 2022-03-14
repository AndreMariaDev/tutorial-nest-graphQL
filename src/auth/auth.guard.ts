import { Injectable,CanActivate,ExecutionContext,HttpException,HttpStatus, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private jwtService: JwtService
      ) {}

    async canActivate(context: ExecutionContext){
        const ctx = GqlExecutionContext.create(context).getContext();
        if(!ctx.headers.authorization){
            return false;
        }
        ctx.user = await this.validateToken(ctx.headers.authorization);
        return true;
    }

    async validateToken(auth: string) {
        if(auth.split(' ')[0] !== 'Bearer'){
            throw new HttpException('Invalid token',HttpStatus.UNAUTHORIZED);
        }

        const token  = auth.split(' ')[1];
        try {
            return await this.jwtService.verify(token); //jwt.verify(token,'secret');
        } catch (error) {
            throw new HttpException('Invalid token',HttpStatus.UNAUTHORIZED);
        }
    }
}



