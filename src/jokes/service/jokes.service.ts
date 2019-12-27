import { Joke } from './../../graphql.schema';
import knex from '../../common/db';

export class JokesService {
  public async getAllJokes(): Promise<Joke[]> {
    return await knex('jokes').select();
  }
}
