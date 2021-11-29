import {
  HttpService,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { Pollution } from '../models/pollution.entity';

@Injectable()
export class PollutionService {
  constructor(
    @InjectRepository(Pollution)
    private readonly pollutionRepository: Repository<Pollution>,
    private readonly httpService: HttpService,
  ) {}

  async saveIqAir(lat, lon) {
    const url = `${process.env.IQAIR_HOST}${process.env.IQAIR_NEAR_CITY}lat=${lat}&lon=${lon}&key=${process.env.IQAIR_KEY}`;

    try {
      const { data } = await this.httpService.get(url).toPromise();

      if (data?.status === 'success') {
        const {
          data: { current },
        } = data;
        return {
          result: {
            pollution: current.pollution,
          },
        };
      }
      throw new UnprocessableEntityException('Something went wrong');
    } catch (err) {
      throw new UnprocessableEntityException('Something went wrong');
    }
  }

  @Cron('60 * * * * *')
  async handleCron() {
    const lat = 48.856613;
    const lon = 2.352222;
    const url = `${process.env.IQAIR_HOST}${process.env.IQAIR_NEAR_CITY}lat=${lat}&lon=${lon}&key=${process.env.IQAIR_KEY}`;

    try {
      const { data } = await this.httpService.get(url).toPromise();

      if (data?.status === 'success') {
        const {
          data: { city, state, country, current },
        } = data;
        const pollution = {
          city,
          state,
          country,
          ts: current.pollution.ts,
          mainus: current.pollution.mainus,
          aqicn: current.pollution.aqicn,
          maincn: current.pollution.maincn,
          aqius: current.pollution.aqius,
        };
        return this.pollutionRepository.save(pollution);
      }
      throw new UnprocessableEntityException('CRON FAILED');
    } catch (err) {
      throw new UnprocessableEntityException('CRON FAILED');
    }
  }
}
