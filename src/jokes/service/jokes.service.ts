import { UserService } from './../../user/service/user.service';
import { Joke, JokeResponse } from './../../graphql.schema';
import knex from '../../common/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JokesService {
  public constructor(private readonly userService: UserService) {}

  public async getAllJokes(): Promise<Joke[]> {
    return await knex('jokes').select();
  }
  public async createJoke(
    joke: string,
    userLogin: string,
  ): Promise<JokeResponse> {
    const { id } = await this.userService.getUserByLogin(userLogin, ['id']);
    const jokeId = await knex('jokes').insert({
      joke,
      user_id: id,
    });
    const newJoke = await this.getJokeById(jokeId[0], [
      'id',
      'joke',
      'likes',
      'dislikes',
    ]);
    return {
      recordId: jokeId[0].toString(),
      record: newJoke,
    };
  }

  public async getJokeById(id: number, projection: string[] = []) {
    return await knex('jokes')
      .select(projection)
      .where('id', id)
      .first();
  }
}
