import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { JokesModule } from './jokes/jokes.module';

@Module({
  imports: [
    UserModule,
    JokesModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req, dataloaders: new WeakMap() }),
    }),
  ],
})
export class AppModule {}
