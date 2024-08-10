import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) 
  password: string;

  address:string;
  email:string
}
