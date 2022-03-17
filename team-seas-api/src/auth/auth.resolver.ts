import { HttpCode, HttpStatus } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninAuthInput } from './dto/signin-auth.input';
import { SignupAuthInput } from './dto/signup-auth.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('signupAuth')
  signup(@Args('signupAuthInput') signupAuthInput: SignupAuthInput) {
    return this.authService.signUp(signupAuthInput);
  }

  @HttpCode(HttpStatus.OK)
  @Mutation('signinAuth')
  signin(@Args('signinAuthInput') signinAuthInput: SigninAuthInput) {
    return this.authService.signIn(signinAuthInput);
  }
}
