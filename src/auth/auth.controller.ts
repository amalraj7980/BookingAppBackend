import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import {  LoginUserDTO } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.register(CreateUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO) {
    return this.authService.login(loginUserDto);
  }
}
