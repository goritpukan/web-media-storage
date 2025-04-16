import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { validationMessages } from '../../../utils/validation.util';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Email'))
  @IsEmail(undefined, validationMessages.mustBeType('Email', 'an email'))
  email: string;

  @ApiProperty({
    description: 'First name of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('First name'))
  @IsString(validationMessages.mustBeType('First name', 'a string'))
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Last name'))
  @IsString(validationMessages.mustBeType('Last name', 'a string'))
  lastName: string;
}
