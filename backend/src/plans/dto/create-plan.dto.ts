import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;
}
