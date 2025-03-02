import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import {
  validationMessages,
  validationOptionsMsg,
} from '../../../utils/validation.util';

export class CreateUserDto {
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
