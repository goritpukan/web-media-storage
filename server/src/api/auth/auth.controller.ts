import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CookieUtils } from '../../utils/cookie.utils';
import { UserEntity } from '../user/entities/user.entity';
import { MapInterceptor } from '@automapper/nestjs';
import { UserDto } from '../user/dto/user.dto';
import { GetUser } from '../../decorators/get-user.decorator';
import { RefreshGuard } from '../../security/jwt/refresh/refresh.guard';
import { UserWithRefreshToken } from '../../security/jwt/refresh/refresh.strategy';

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

  @UseGuards(RefreshGuard)
  @Post('/refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: UserWithRefreshToken,
  ) {
    const tokens = await this.authService.refresh(user);
    CookieUtils.setResponseJwt(res, tokens, {
      accessTokenExpires: this.authService.getTokenExpTime(tokens.accessToken),
      refreshTokenExpires: this.authService.getTokenExpTime(
        tokens.refreshToken,
      ),
    });
  }

  @UseGuards(RefreshGuard)
  @Post('/logout')
  async logout (
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: UserWithRefreshToken,
  ) {
    await this.authService.logout(user);
    CookieUtils.clearResponseCookie(res, ['access', 'refresh']);
  }
}
