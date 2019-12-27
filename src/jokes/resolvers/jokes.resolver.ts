import { GqlAuthGuard } from './../../common/gqlAuth';
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Joke } from './../../graphql.schema';
import { JokesService } from '../service/jokes.service';

@Resolver(_of => Joke)
@UseGuards(GqlAuthGuard)
export class JokesResolver {
  public constructor(private readonly jokesService: JokesService) {}

  @Query(_returns => [Joke])
  public async allJokes(): Promise<Joke[]> {
    return await this.jokesService.getAllJokes();
  }
}
