import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CookieUtils } from '../../utils/cookie.utils';
import { UserEntity } from '../user/entities/user.entity';
import { MapInterceptor } from '@automapper/nestjs';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseInterceptors(MapInterceptor(UserEntity, UserDto))
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserDto> {
    const { accessToken, refreshToken, user } =
      await this.authService.login(body);
    CookieUtils.setResponseJwt(
      res,
      { accessToken, refreshToken },
      {
        accessTokenExpires: this.authService.getTokenExpTime(accessToken),
        refreshTokenExpires: this.authService.getTokenExpTime(refreshToken),
      },
    );
    return user;
  }
}
