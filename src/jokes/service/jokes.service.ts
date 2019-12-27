import { Joke, JokeResponse } from './../../graphql.schema';
import knex from '../../common/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JokesService {
  public async getAllJokes(): Promise<Joke[]> {
    return await knex('jokes').select();
  }
  public async createJoke(joke: string, userId: string): Promise<JokeResponse> {
    const jokeId = await knex('jokes').insert({
      joke,
      user_id: userId,
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
  public async getJokesByUser(id: number, projection: string[] = []) {
    return await knex('jokes')
      .select(projection)
      .where('user_id', id);
  }
}
