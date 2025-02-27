import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma.service';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [],
  providers: [
    PrismaService,
    UserRepository,
    RefreshTokenRepository,
    JwtService,
  ],
  exports: [
    PrismaService,
    UserRepository,
    RefreshTokenRepository,
    JwtService,
  ],
})
export class DatabaseModule {}
