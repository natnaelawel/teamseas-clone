import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  @Cron('10 * * * * *')
  async handleCron() {
    const users = await this.prisma.user.findMany();
    console.log(users, ' is users');
    this.logger.debug('Called when the second is 45');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }

  addCronJob(name: string, seconds: string) {
    const job = `${seconds} * * * * *`;
    this.schedulerRegistry.addCronJob(name, job);
    // job.start();
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
    });
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }
}
