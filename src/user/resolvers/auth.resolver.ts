import {
  AuthInput,
  SignUpResponse,
  AuthMutations,
} from './../../graphql.schema';
import { Args, Mutation, ResolveProperty, Resolver } from '@nestjs/graphql';
import { UserService } from '../service/user.service';

@Resolver(_of => AuthMutations)
export class AuthResolver {
  public constructor(private readonly userService: UserService) {}

  @Mutation(_returns => AuthMutations)
  public async auth() {
    return {};
  }

  @ResolveProperty(_returns => SignUpResponse)
  public async signUp(@Args('user') user: AuthInput): Promise<SignUpResponse> {
    try {
      const newUser = await this.userService.signUp(user);
      return {
        recordId: newUser.id,
        record: newUser,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  @ResolveProperty(_returns => SignUpResponse)
  public async signIn(@Args('user') user: AuthInput): Promise<SignUpResponse> {
    try {
      const newUser = await this.userService.signIn(user);
      return {
        recordId: newUser.id,
        record: newUser,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
