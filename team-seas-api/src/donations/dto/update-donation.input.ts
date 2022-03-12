import { CreateDonationInput } from './create-donation.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDonationInput extends PartialType(CreateDonationInput) {
  id: number;
}
