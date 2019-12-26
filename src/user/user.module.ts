import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';
import { userProviders } from './user.providers';
import { UserService } from './service/user.service';
import { resolvers } from './resolvers';
import { DateBase } from 'src/common/db';

@Module({
  providers: [
    ...userProviders,
    ...resolvers,
    UserService,
    JwtStrategy,
    DateBase,
  ],
  exports: [UserService, ...userProviders],
})
export class UserModule {}
