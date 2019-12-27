import { Module } from '@nestjs/common';
import { resolvers } from './resolvers';

@Module({
  providers: [...resolvers],
})
export class JokesModule {}
