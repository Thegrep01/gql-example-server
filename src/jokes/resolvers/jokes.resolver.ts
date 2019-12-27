import { GqlAuthGuard, CurrentUser } from './../../common/gqlAuth';
import {
  Resolver,
  Query,
  Mutation,
  ResolveProperty,
  Args,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Joke, JokesMutations, JokeResponse } from './../../graphql.schema';
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
@Resolver(_of => JokesMutations)
@UseGuards(GqlAuthGuard)
export class JokesMutationResolver {
  public constructor(private readonly jokesService: JokesService) {}

  @Mutation(_returns => JokesMutations)
  public async jokes() {
    return {};
  }

  @ResolveProperty(_returns => JokeResponse)
  public async createJoke(
    @Args('joke') joke: string,
    @CurrentUser() login,
  ): Promise<JokeResponse> {
    try {
      return await this.jokesService.createJoke(joke, login);
    } catch (error) {
      return {
        error,
      };
    }
  }
}
