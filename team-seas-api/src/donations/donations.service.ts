import { Injectable } from '@nestjs/common';
import { Donation, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationInput } from './dto/create-donation.input';
import { UpdateDonationInput } from './dto/update-donation.input';
import { OrderByParams } from '../graphql';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDonationInput: CreateDonationInput) {
    return this.prisma.donation.create({ data: createDonationInput });
  }

  findAll(orderBy?: OrderByParams) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};
    return this.prisma.donation.findMany({ orderBy: { [field]: direction } });
  }

  async getTotal() {
    const response = await this.prisma.donation.aggregate({
      _sum: {
        count: true,
      },
    });
    const total = response._sum.count;
    return total;
  }

  findOne(id: number) {
    return this.prisma.donation.findFirst({ where: { id } });
  }

  update(id: number, updateDonationInput: UpdateDonationInput) {
    return `This action updates a #${id} donation`;
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }
}
