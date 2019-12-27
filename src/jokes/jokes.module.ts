import { UserService } from './../user/service/user.service';
import { Module } from '@nestjs/common';
import { resolvers } from './resolvers';
import { JokesService } from './service/jokes.service';

@Module({
  providers: [...resolvers, JokesService, UserService],
})
export class JokesModule {}
