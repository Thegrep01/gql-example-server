import { AuthInput, User } from './../../graphql.schema';
import { Injectable } from '@nestjs/common';
import knex from '../../common/db';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  public async signUp(newUser: AuthInput): Promise<User> {
    if (await this.getUserByLogin(newUser.login)) {
      throw Error('user exists');
    }
    const accessToken: string = jwt.sign(newUser.login, 'secret');
    const hash: string = await bcrypt.hash(newUser.password, 10);
    const userId = await knex('users').insert({
      login: newUser.login,
      password: hash,
    });

    return {
      id: userId[0].toString(),
      accessToken,
      login: newUser.login,
    };
  }

  public async signIn({ login, password }): Promise<User> {
    const user = await this.getUserByLogin(login);
    if (
      !user ||
      (user && !(await bcrypt.compare(password, user.password as string)))
    ) {
      throw Error('Invalid username or password');
    }
    const accessToken: string = jwt.sign(user.login, 'secret');
    return {
      id: user.id,
      accessToken,
      login,
    };
  }

  public async getUserByID(query: number, projection: string[] = []) {
    return await knex('users')
      .select(projection)
      .where('id', query);
  }
  public async getUserByLogin(query: string, projection: string[] = []) {
    return await knex('users')
      .select(projection)
      .where('login', query)
      .first();
  }
  public async getUsersByIds(query: number[], projection: string[] = []) {
    return await knex('users')
      .select(projection)
      .whereIn('id', query);
  }
}
