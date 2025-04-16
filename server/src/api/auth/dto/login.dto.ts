import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { validationMessages } from '../../../utils/validation.util';

export class LoginDto {
  @ApiProperty({
    description: 'email of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Email'))
  @IsEmail(undefined, validationMessages.mustBeType('Email', 'an email'))
  email: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty(validationMessages.cannotBeEmpty('Password'))
  @IsString(validationMessages.mustBeType('Password', 'a string'))
  password: string;
}
