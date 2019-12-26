import * as passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { NextFunction, Request } from 'express';
const secret: string = 'secret';

@Injectable()
export class JwtStrategy extends Strategy {
  public constructor() {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: secret,
      },
      async (req: Request, payload: string, next: NextFunction) =>
        await this.verify(req, payload, next),
    );
    passport.use(this);
  }
  public async verify(
    _req: Request,
    payload: string,
    done: VerifiedCallback,
  ): Promise<void> {
    return done(null, payload);
  }
}
