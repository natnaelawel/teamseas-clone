import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Global()
@Module({
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
