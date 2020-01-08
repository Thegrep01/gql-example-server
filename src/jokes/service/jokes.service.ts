import { Joke, JokeResponse } from './../../graphql.schema';
import knex from '../../common/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JokesService {
  public async getAllJokes(page: number, perPage: number): Promise<Joke[]> {
    return await knex('jokes')
      .select()
      .limit(perPage)
      .offset((page - 1) * perPage)
      .orderBy('created_at', 'desc');
  }
  public async getTotalCount(): Promise<number> {
    return await knex('jokes').count('id');
  }

  public async createJoke(joke: string, userId: string): Promise<JokeResponse> {
    const jokeId = await knex('jokes').insert({
      joke,
      user_id: userId,
      created_at: new Date().toISOString(),
    });
    const newJoke = await this.getJokeById(jokeId[0], ['id', 'joke']);
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
  public async getUserByJoke(id: number, projection: string[] = []) {
    return await knex('jokes')
      .select(projection)
      .innerJoin('users', 'users.id', 'jokes.user_id')
      .groupBy('jokes.id')
      .having('jokes.id', '=', id)
      .first();
  }
}
