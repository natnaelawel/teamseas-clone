import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  isNumber,
  MinLength,
} from 'class-validator';

export class CreateDonationInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  displayName: string;

  @IsNumber()
  count: number;

  mobile?: string | null;
  team?: string | null;
  message?: string | null;
  createdAt?: Date | string;
}
