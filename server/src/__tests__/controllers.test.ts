import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app';
import Favourite, { IFav } from '../models/favourite';

let mongoServer: MongoMemoryServer;

describe('Favourites Controller', () => {
  beforeAll(async () => {
    // Start an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  })  

  afterAll(async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  })

  beforeEach(async () => {
    await Favourite.deleteMany(); // Clean the database before each test
  })
  afterEach(async () => {
    await Favourite.deleteMany(); // Clean the database after each test
  })

  it('should fetch all favourites', async () => {
    await Favourite.create({
      eventId: 'TestEvent123',
      eventDetails: { name: 'Test Event' },
    });

    // Perform the GET request
    const res = await request(app).get('/api/favourites').expect(200);
    
    // Assert the response
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].eventId).toBe('TestEvent123');
    expect(res.body[0].eventDetails.name).toBe('Test Event');
  })

  it('should return an empty array when no favourites exist', async () => {
    const res = await request(app).get('/api/favourites').expect(200);
    expect(res.body).toEqual([]);
  });

  it('should handle adding a favourite', async () => {
    const newFavourite = {
      eventId: 'NewEvent123',
      eventDetails: { name: 'New Event' },
    };

    // Perform the POST request
    const res = await request(app)
      .post('/api/favourites')
      .send(newFavourite)
      .expect(201);

    // Assert the response
    expect(res.body.eventId).toBe('NewEvent123');

    // Verify the data was saved in the database
    const savedFavourite : any = await Favourite.findOne<IFav>({ 
      eventId: 'NewEvent123',
     });
    expect(savedFavourite).not.toBeNull();
    expect(savedFavourite.eventDetails.name).toBe('New Event');
  })
})

describe('Integration Test - /api/favourites', () => {

  beforeAll(async () => {
    // Start an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  })  

  afterAll(async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  })

  it('should add and retrieve a favrouite', async () => {
    // Add a favourite
    const newFavourite = {
      eventId: 'TestEvent123',
      eventDetails: { name: 'Test Event' },
    };

    const postResponse = await request(app)
      .post('/api/favourites')
      .send(newFavourite)
      .expect(201);
    expect(postResponse.body.eventId).toBe('TestEvent123');

    // Retrieve all favourites
    const getResponse = await request(app)
      .get('/api/favourites')
      .expect(200);
    expect(getResponse.body.length).toBe(1);
    expect(getResponse.body[0].eventId).toBe('TestEvent123');
  })
})