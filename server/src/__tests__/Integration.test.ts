import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import app from '../app';

describe('Integration Test - /api/favourites', () => {

  let mongoServer: MongoMemoryServer;

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
    const newFavourite = {
      eventId: 'TestEvent123',
      eventDetails: { name: 'Test Event' },
    };
  
    // Add a favourite
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

  
  it('should add and delete a favrouite', async () => {
    // Add a favourite
    const newFavourite = {
      eventId: 'TestEvent456',
      eventDetails: { name: 'Delete Test Event' },
    };

    const postResponse = await request(app)
      .post('/api/favourites')
      .send(newFavourite)
      .expect(201);
    expect(postResponse.body.eventId).toBe('TestEvent456');

    // Delete the favourite
    const deleteResponse = await request(app)
    .delete(`/api/favourites/${newFavourite.eventId}`)
    .expect(200);
    expect(deleteResponse.body.message).toBe('Successfully removed from Favourites');

    // Confirm deletion
    const finalGetResponse = await request(app)
      .get('/api/favourites')
      .expect(200);
    expect(finalGetResponse.body.length).toBe(1);

  })

})