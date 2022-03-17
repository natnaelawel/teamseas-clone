import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { OrderByParams } from '../graphql';
import { DonationsService } from './donations.service';
import { CreateDonationInput } from './dto/create-donation.input';
import { UpdateDonationInput } from './dto/update-donation.input';

const pubSub = new PubSub();

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  async create(
    @Args('createDonationInput')
    createDonationInput: CreateDonationInput,
  ) {
    const created = await this.donationsService.create(createDonationInput);
    const total = this.donationsService.getTotal();
    pubSub.publish('totalUpdated', { totalUpdated: { total } });
    return created;
  }

  @Query('donations')
  findAll(@Args('orderBy') orderBy?: OrderByParams) {
    return this.donationsService.findAll(orderBy);
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne(id);
  }

  @Query('totalDonations')
  totalDonations() {
    return this.donationsService.getTotal();
  }

  @Subscription('totalUpdated')
  totalUpdated() {
    return pubSub.asyncIterator('totalUpdated');
  }

  @Mutation('updateDonation')
  update(
    @Args('updateDonationInput') updateDonationInput: UpdateDonationInput,
  ) {
    return this.donationsService.update(
      updateDonationInput.id,
      updateDonationInput,
    );
  }

  @Mutation('removeDonation')
  remove(@Args('id') id: number) {
    return this.donationsService.remove(id);
  }
}
