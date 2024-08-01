import { IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  gender: string;

  @IsString()
  age: string;
}
