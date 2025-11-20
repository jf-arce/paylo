import { Module } from '@nestjs/common';
import { ServicesService } from '@/services/services.service';
import { ServicesController } from '@/services/services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '@/services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
