import { GqlAuthGuard } from './../../common/gqlAuth';
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Joke } from './../../graphql.schema';

@Resolver(_of => Joke)
@UseGuards(GqlAuthGuard)
export class JokesResolver {
  //   public constructor(private readonly userService: UserService) {}

  @Query(_returns => [Joke])
  public async allJokes(): Promise<Joke[]> {
    return [];
  }
}
