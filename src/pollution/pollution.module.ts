import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollutionController } from './controllers/pollution.controller';
import { Pollution } from './models/pollution.entity';
import { PollutionService } from './services/pollution.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pollution]), HttpModule],
  controllers: [PollutionController],
  providers: [PollutionService],
})
export class PollutionModule {}
