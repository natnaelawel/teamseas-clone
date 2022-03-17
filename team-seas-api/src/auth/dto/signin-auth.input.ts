import { IsEmail, IsNotEmpty } from "class-validator";

export class SigninAuthInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
