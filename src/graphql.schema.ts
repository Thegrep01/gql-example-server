
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
    likes?: number;
    dislikes?: number;
    user?: User;
}

export abstract class IMutation {
    abstract auth(): AuthMutations | Promise<AuthMutations>;
}

export abstract class IQuery {
    abstract allJokes(): Joke[] | Promise<Joke[]>;

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
}
