import * as knex from 'knex';

export class DateBase {
  public knex = knex({
    client: 'sqlite3',
    connection: {
      filename: './mydb.sqlite',
    },
  });
}
