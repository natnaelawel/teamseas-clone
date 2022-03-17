import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { CurrentUser } from '../auth/decorators/current-user.decorators';
import { User } from '@prisma/client';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Query('getMe')
  getMe(@CurrentUser() currentUser: User) {
    return this.usersService.findById(currentUser.id);
  }

  @UseGuards(JwtGuard)
  @Query('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findOne(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.usersService.remove(id);
  }
}
