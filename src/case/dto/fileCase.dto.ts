// src/case/dto/create-case.dto.ts
import { IsString, IsBoolean, IsOptional, IsDate, IsEmail } from 'class-validator';

export class fileCaseDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isApproved?: boolean;

  @IsEmail()
  respondentEmail: string;

  @IsString()
  respondentPhone: string;

  @IsBoolean()
  @IsOptional()
  responded?: boolean;

  @IsString()
  @IsOptional()
  respondentDescription?: string;

  @IsDate()
  @IsOptional()
  hearing?: Date;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;
}
