import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { validationMessages } from '../../../utils/validation.util';

export class UpdateVideoDto {
  @ApiProperty({ description: 'Name of the video' })
  @IsOptional()
  @IsString(validationMessages.mustBeType('Name', 'a string'))
  name: string;

  @ApiProperty({ description: 'Description of the video' })
  @IsOptional()
  @IsString(validationMessages.mustBeType('Description', 'a string'))
  description: string;
}
