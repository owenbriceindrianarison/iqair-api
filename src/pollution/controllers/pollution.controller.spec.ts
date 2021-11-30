import { Test, TestingModule } from '@nestjs/testing';
import { PollutionService } from '../services/pollution.service';
import { PollutionController } from './pollution.controller';

describe('PollutionController', () => {
  let controller: PollutionController;

  const mockPollutionService = {
    getPollution: jest.fn((lat, lon) => ({
      result: {
        pollution: {
          ts: Date.now(),
          aqius: 37,
          mainus: 'p2',
          aqicn: 14,
          maincn: 'p1',
        },
      },
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollutionController],
      providers: [PollutionService],
    })
      .overrideProvider(PollutionService)
      .useValue(mockPollutionService)
      .compile();

    controller = module.get<PollutionController>(PollutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get pollution with given coordinate', () => {
    const lat = 42;
    const lon = 2;
    expect(controller.getPollution(lat, lon)).toEqual({
      result: {
        pollution: {
          ts: expect.any(Number),
          aqius: 37,
          mainus: 'p2',
          aqicn: 14,
          maincn: 'p1',
        },
      },
    });

    expect(mockPollutionService.getPollution).toHaveBeenCalledWith(lat, lon);
  });
});
