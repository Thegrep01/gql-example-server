import { JokesService } from '../jokes/service/jokes.service';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';

import { resolvers } from './resolvers';
import { UserService } from './service/user.service';

@Module({
  providers: [...resolvers, UserService, JwtStrategy, JokesService],
  exports: [UserService],
})
export class UserModule {}
