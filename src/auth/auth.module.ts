import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/user.providers';
import { loginUsersProviders } from 'src/login/login.providers';
import { LoginUsersService } from '../login/login.service';
import { AuthGuard } from './auth.guard';
import { LoginUsersModule } from '../login/login.module';
import { GraphqlAuthGuard } from './GraphqlAuthGuard ';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    forwardRef(() => LoginUsersModule),
    UsersModule,
  ],
  providers: [
    AuthService, 
    // LocalStrategy, 
    JwtStrategy, 
    GraphqlAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}