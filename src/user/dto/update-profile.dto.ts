import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  faculty?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  matricNumber?: string;

  @IsOptional()
  @IsString()
  placeOfIT?: string;

  @IsOptional()
  @IsString()
  deptCoordinator?: string;

  @IsOptional()
  @IsString()
  industryBasedSupervisor?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  startDate?: Date;

  @IsOptional()
  @IsString()
  endDate?: Date;
}
