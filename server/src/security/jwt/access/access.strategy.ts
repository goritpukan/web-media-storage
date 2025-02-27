import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import * as process from 'node:process';
import { JwtPayload } from '../jwt-payload';
import { CookieUtils } from '../../../utils/cookie.utils';
@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: CookieUtils.getRequestJwt('access'),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }
  async validate(payload: JwtPayload) {
    return payload;
  }
}
