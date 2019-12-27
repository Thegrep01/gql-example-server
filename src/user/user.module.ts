import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';

import { resolvers } from './resolvers';
import { UserService } from './service/user.service';

@Module({
  providers: [...resolvers, UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
