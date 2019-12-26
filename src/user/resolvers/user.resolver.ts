import { CurrentUser, GqlAuthGuard } from './../../common/gqlAuth';
import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from './../../graphql.schema';

@Resolver(_of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  public constructor(private readonly userService: UserService) {}

  @Query(_returns => User)
  public async currentUser(@CurrentUser() login): Promise<User> {
    return await this.userService.getUserByLogin(login);
  }
}
