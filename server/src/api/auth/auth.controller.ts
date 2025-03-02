import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CookieUtils } from '../../utils/cookie.utils';
import { UserEntity } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) res: Response): Promise<UserEntity> {
    const { accessToken, refreshToken, user } = await this.authService.login(loginDto);
    CookieUtils.setResponseJwt(res, {accessToken, refreshToken}, {
      accessTokenExpires: this.authService.getTokenExpTime(accessToken),
      refreshTokenExpires: this.authService.getTokenExpTime(refreshToken),
    });
    return user;
  }
}
