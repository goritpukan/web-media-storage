import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import process from 'node:process';
import { JwtPayload } from '../jwt-payload';
import { Request } from 'express';
import { CookieUtils } from '../../../utils/cookie.utils';
import { RefreshTokenRepository } from '../../../database/repositories/refresh-token.repository';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly refreshTokenRepository: RefreshTokenRepository) {
    super({
      jwtFromRequest: CookieUtils.getRequestJwt('refresh'),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = CookieUtils.getRequestJwt('refresh')[0](req);

    const token = await this.refreshTokenRepository.find({
      userId: payload.id,
      token: refreshToken,
    });
    if (!token) throw new UnauthorizedException();
    return { ...payload, refreshToken };
  }
}
