import { Module, Controller, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { usersProviders } from './user.providers';
import { UserResolver } from './users.resolver';
import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers:[UserResolver,UsersService, ...usersProviders],
  exports:[UsersService]
})
export class UsersModule {}