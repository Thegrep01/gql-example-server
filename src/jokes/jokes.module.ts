import { Module } from '@nestjs/common';
import { resolvers } from './resolvers';
import { JokesService } from './service/jokes.service';

@Module({
  providers: [...resolvers, JokesService],
})
export class JokesModule {}
