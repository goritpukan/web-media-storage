import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FilesValidationPipe implements PipeTransform {
  transform(files: any, metadata: ArgumentMetadata) {
    if (
      !files.video ||
      !files.video[0] ||
      !files.preview ||
      !files.preview[0]
    ) {
      throw new BadRequestException(
        'Both video and preview files are required',
      );
    }

    const video = files.video[0];
    const preview = files.preview[0];

    const MAX_SIZE = 50 * 1024 * 1024;
    if (video.size > MAX_SIZE || preview.size > MAX_SIZE) {
      throw new BadRequestException('File size exceeds the limit of 50MB');
    }

    if (!video.mimetype.match(/^video\/(mp4|avi|mkv|webm)$/)) {
      throw new BadRequestException(
        'Only mp4, avi, mkv, webm formats are allowed for video',
      );
    }

    if (!preview.mimetype.match(/^image\/(jpeg|png|webm|jpg)$/)) {
      throw new BadRequestException(
        'Only jpeg, png, webm, jpg formats are allowed for preview image',
      );
    }
    return files;
  }
}
