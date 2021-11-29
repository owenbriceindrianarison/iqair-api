import { Controller, Get, Param, Post } from '@nestjs/common';
import { PollutionService } from '../services/pollution.service';

@Controller('pollution')
export class PollutionController {
  constructor(private readonly pollutionService: PollutionService) {}

  @Get(':lat/:lon')
  create(@Param('lat') lat: number, @Param('lon') lon: number) {
    return this.pollutionService.saveIqAir(lat, lon);
  }
}
