import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';
// import { userProviders } from './user.providers';
// import { UserService } from './service/user.service';
import { resolvers } from './resolvers';
import { UserService } from './service/user.service';

@Module({
  providers: [
    // ...userProviders,
    ...resolvers,
    UserService,
    JwtStrategy,
  ],
})
export class UserModule {}
