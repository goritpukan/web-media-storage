import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationMessages } from '../../../utils/validation.util';

export class CreateVideoDto {
  @ApiProperty({description: 'Name of the video'})
  @IsNotEmpty(validationMessages.cannotBeEmpty('Name'))
  @IsString(validationMessages.mustBeType('Name', 'a string'))
  name: string;

  @ApiProperty({description: 'Description of the video'})
  @IsNotEmpty(validationMessages.cannotBeEmpty('Description'))
  @IsString(validationMessages.mustBeType('Description', 'a string'))
  description: string;
}