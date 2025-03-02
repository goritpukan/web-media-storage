import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  validationMessages,
  validationOptionsMsg,
} from '../../../utils/validation.util';

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
  @Matches(
    new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,32}$/),
    validationOptionsMsg(
      'The password must be between 6 and 32 characters long, include at least 1 digit and 1 latin letter',
    ),
  )
  password: string;
}
