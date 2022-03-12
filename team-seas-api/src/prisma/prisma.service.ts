import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  // the config creates an injectable config service
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });

    console.log(config.get('DATABASE_URL'), ' IS DATABASE URL');
  }

  cleanDb() {
    return this.$transaction([this.donation.deleteMany()]);
  }
}
