import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import {  LoginUserDTO } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs'; // For password hashing
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,private jwtService: JwtService,) {}

  async register(CreateUserDto: CreateUserDto) {
    const { fullname, email, password } = CreateUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Adjust salt rounds as needed

    // Create new user
    const newUser = new this.userModel({ fullname, email, password: hashedPassword });
    await newUser.save();

    return { message: 'User registered successfully' };
  }

  async login(loginUserDto: LoginUserDTO) {
    const { usernameOrEmail, password } = loginUserDto;

    // Find user by username or email
    const user = await this.userModel.findOne({ 
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] 
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
   const payload = { username: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
