import { JokesService } from './../../jokes/service/jokes.service';
import { CurrentUser, GqlAuthGuard } from './../../common/gqlAuth';
import {
  Resolver,
  Query,
  ResolveProperty,
  Parent,
  Context,
  Info,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User, Joke } from './../../graphql.schema';
import DataLoader = require('dataloader');

@Resolver(_of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  public constructor(
    private readonly userService: UserService,
    private readonly jokesService: JokesService,
  ) {}

  @Query(_returns => User)
  public async currentUser(@CurrentUser() login): Promise<User> {
    return await this.userService.getUserByLogin(login);
  }

  @ResolveProperty(_returns => [Joke])
  public async jokes(@Parent() { id }, @Context() context, @Info() info) {
    return await this.jokesService.getJokesByUser(id);
  }
}
