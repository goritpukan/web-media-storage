import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { UploadService } from './upload.service';

@Module({
  imports: [
    // MulterModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     storage: multerS3({
    //       s3: new S3Client({
    //         region: configService.get<string>('S3_STORAGE_REGION'),
    //         endpoint: configService.get<string>('S3_STORAGE_URL'),
    //         credentials: {
    //           accessKeyId: configService.get('S3_ACCESS_KEY'),
    //           secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
    //         },
    //         forcePathStyle: true,
    //       }),
    //       bucket: configService.get<string>('S3_BUCKET_NAME'),
    //
    //     })
    //   })
    // })
  ],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {
}