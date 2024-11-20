import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Favourite, { iFav } from '../models/favourite';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
})

describe('Favourite Model - Schema Validation', () => {
  it('should save a valid favourite', async () => {
    const validFavourite: iFav = new Favourite({
      eventId:'TestEvent123',
      eventDetails: {
        name: 'Test Event',
        url: 'http://example.com',
        dates: {
          start: {
            localDate: '2024-12-25',
            localTime: '19:00:00',
          }
        }
      }
    })

    const savedFavourite = await validFavourite.save();
    expect(savedFavourite._id).toBeDefined();
    expect(savedFavourite.eventId).toBe('TestEvent123');
  })

  it('should throw a validation error if eventId is missing', async () => {
    const invalidFavourite = new Favourite({
      eventDetails: {
        name: 'Test Event',
        url: 'http://example.com',
        dates: {
          start: {
            localDate: '2024-12-25',
            localTime: '19:00:00',
          },
        },
      },
    });

    await expect(invalidFavourite.save()).rejects.toThrow(mongoose.Error.ValidationError);
  });
  
})