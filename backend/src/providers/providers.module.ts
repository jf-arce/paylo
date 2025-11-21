import { Module } from '@nestjs/common';
import { ProvidersService } from '@/providers/providers.service';
import { ProvidersController } from '@/providers/providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '@/providers/entities/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
