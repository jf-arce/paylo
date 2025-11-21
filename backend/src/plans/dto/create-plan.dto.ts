import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsUUID()
  @IsNotEmpty()
  serviceId: string;
}
