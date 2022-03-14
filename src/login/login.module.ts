import { Module, Controller, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { LoginUsersService } from './login.service';
import { loginUsersProviders } from './login.providers';
import { LoginUserResolver } from './login.resolver';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  providers:[
    LoginUserResolver,
    LoginUsersService, ...loginUsersProviders
  ],
  exports:[LoginUsersService]
})
export class LoginUsersModule {}