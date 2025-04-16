import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private client: S3Client;
  private bucketName: string = this.configService.get<string>('S3_BUCKET_NAME');

  constructor(private readonly configService: ConfigService) {
    const s3Region: string =
      this.configService.get<string>('S3_STORAGE_REGION');

    if (!s3Region) {
      throw new Error('S3_STORAGE_REGION not found in environment variables');
    }

    this.client = new S3Client({
      region: s3Region,
      endpoint: this.configService.get<string>('S3_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const key: string = uuidv4();
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype || 'video/mp4',
        ACL: 'public-read',
      });
      await this.client.send(command);
      return key;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while uploading the preview',
      );
    }
  }

  async deleteFileByKey(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });
      await this.client.send(command);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete file.');
    }
  }

  getPublicUrl(key: string): string {
    const bucketUrl = this.configService
      .get<string>('S3_STORAGE_URL')
      .replace('s3', 'object');
    return `${bucketUrl}/${this.bucketName}/${key}`;
  }
}
