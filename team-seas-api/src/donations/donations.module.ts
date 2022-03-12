import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsResolver } from './donations.resolver';

@Module({
  providers: [DonationsResolver, DonationsService],
})
export class DonationsModule {}
