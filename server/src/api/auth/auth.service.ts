import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from '../../security/jwt/jwt-payload';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(data: LoginDto) {
    const user: User = await this.userService.getUser({ email: data.email });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Password or email is incorrect');
    }
    return {
      accessToken: this.generateToken(user, 'access'),
      refreshToken: await this.createRefreshToken(user),
      user,
    };
  }

  private async createRefreshToken(
    user: User,
    options?: JwtSignOptions,
  ): Promise<string> {
    const token = this.generateToken(user, 'refresh', options);
    await this.userService.updateRefreshToken(user.id, token);
    return token;
  }

  private generateToken(
    user: User,
    token: 'access' | 'refresh',
    options?: JwtSignOptions,
  ): string {
    const payload: JwtPayload = { sub: user.id };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(token == 'access' ? 'ACCESS_TTL' : 'REFRESH_TTL'),
      secret: this.configService.get<string>('JWT_SECRET'),
      ...options,
    });
  }
  getTokenExpTime(token: string): number {
    return this.jwtService.decode(token).exp * 1000;
  }
}
