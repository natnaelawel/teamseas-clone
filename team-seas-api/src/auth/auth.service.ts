import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { SignupAuthInput } from './dto/signup-auth.input';
import { SigninAuthInput } from './dto/signin-auth.input';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async signUp(dto: SignupAuthInput) {
    // generate the password hash
    // // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          password: hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signIn(dto: SigninAuthInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (user) {
        const hashedPassword = user.password;

        const isMatched = await argon.verify(hashedPassword, dto.password);
        if (isMatched) {
          return this.signToken(user.id, user.email);
        } else {
          throw new ForbiddenException('Invalid Credentials');
        }
      } else {
        throw new ForbiddenException('No User with the give email');
      }
    } catch (error) {
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

 
}
