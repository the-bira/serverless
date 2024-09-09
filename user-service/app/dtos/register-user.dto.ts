import { IsEmail, IsNotEmpty, IsString, MinLength, IsNumberString } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;

  @IsNumberString()
  @IsNotEmpty()
  phone: string;
}