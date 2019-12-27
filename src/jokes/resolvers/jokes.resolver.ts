import { UserService } from './../../user/service/user.service';
import { GqlAuthGuard, CurrentUser } from './../../common/gqlAuth';
import {
  Resolver,
  Query,
  Mutation,
  ResolveProperty,
  Args,
  Parent,
  Context,
  Info,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import {
  Joke,
  JokesMutations,
  JokeResponse,
  User,
} from './../../graphql.schema';
import { JokesService } from '../service/jokes.service';
import DataLoader = require('dataloader');

@Resolver(_of => Joke)
@UseGuards(GqlAuthGuard)
export class JokesResolver {
  public constructor(
    private readonly jokesService: JokesService,
    private readonly userService: UserService,
  ) {}

  @Query(_returns => [Joke])
  public async allJokes(): Promise<Joke[]> {
    return await this.jokesService.getAllJokes();
  }

  @ResolveProperty(_returns => User)
  public async author(@Parent() root, @Context() context, @Info() info) {
    const { dataloaders } = context;

    let dl = dataloaders.get(info.fieldNodes);
    if (!root.user_id) {
      return await this.jokesService.getUserByJoke(root.id, [
        'users.login',
        'users.id',
      ]);
    }
    if (!dl) {
      dl = new DataLoader(async (ids: any) => {
        return await this.userService.getUsersByIds(ids);
      });
      dataloaders.set(info.fieldNodes, dl);
    }
    return dl.load(root.user_id);
  }
}
@Resolver(_of => JokesMutations)
@UseGuards(GqlAuthGuard)
export class JokesMutationResolver {
  public constructor(
    private readonly jokesService: JokesService,
    private readonly userService: UserService,
  ) {}

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
      const { id } = await this.userService.getUserByLogin(login, ['id']);
      return await this.jokesService.createJoke(joke, id);
    } catch (error) {
      return {
        error,
      };
    }
  }
}
