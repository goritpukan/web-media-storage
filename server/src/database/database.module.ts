import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma.service';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { JwtService } from '@nestjs/jwt';
import { VideoRepository } from './repositories/video.repository';

@Global()
@Module({
  imports: [],
  providers: [
    PrismaService,
    UserRepository,
    RefreshTokenRepository,
    VideoRepository,
    JwtService,
  ],
  exports: [
    PrismaService,
    UserRepository,
    VideoRepository,
    RefreshTokenRepository,
    JwtService,
  ],
})
export class DatabaseModule {}
