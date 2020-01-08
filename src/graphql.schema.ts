
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class AuthInput {
    login: string;
    password: string;
}

export class AuthMutations {
    signUp: SignUpResponse;
    signIn: SignUpResponse;
}

export class Joke {
    id: string;
    joke: string;
    author?: User;
}

export class JokeResponse {
    recordId?: string;
    record?: Joke;
    error?: string;
}

export class JokesMutations {
    createJoke: JokeResponse;
}

export class JokesPagination {
    items: Joke[];
    pageInfo: PaginationInfo;
}

export abstract class IMutation {
    abstract jokes(): JokesMutations | Promise<JokesMutations>;

    abstract auth(): AuthMutations | Promise<AuthMutations>;
}

export class PaginationInfo {
    totalItems: number;
    page: number;
    perPage: number;
}

export abstract class IQuery {
    abstract allJokes(page?: number, perPage?: number): JokesPagination | Promise<JokesPagination>;

    abstract currentUser(): User | Promise<User>;
}

export class SignUpResponse {
    recordId?: string;
    record?: User;
    error?: string;
}

export class User {
    id: string;
    login: string;
    accessToken?: string;
    jokes?: Joke[];
}
