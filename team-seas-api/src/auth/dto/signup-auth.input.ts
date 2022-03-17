import {
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class SignupAuthInput {
  @MinLength(3)
  firstName: string;

  @MinLength(3)
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
