import request from 'supertest';
import app from '../app';
import nock from 'nock';
import mongoose, { mongo } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Favourite, { IFav} from '../models/favourite';

describe('GET /events', function () {

  beforeAll(() => {
    nock('https://app.ticketmaster.com/')
      .get('/discovery/v2/events.json')
      .query(true)
      .reply(200, {_embedded: {futureEvents:[]}});
  })
  
  afterAll(async () => {
    // Close MongoDB connection after tests
    await mongoose.connection.close();
  });

  it('responds with json containing future events', function(done) {
    request(app)
      .get('/api/events?lat=52.52437&long=13.41053')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).toHaveProperty('futureEvents');
        expect(Array.isArray(res.body.futureEvents)).toBe(true);
        done();
      });
  });

  it('respond with 400 for missing query parameters', function (done) {
    request(app)
      .get('/api/events')
      .expect(400, done);
  });

  it('respond with 400 for invalid query parameters', function (done) {
    request(app)
      .get('/api/events?lat=invalid&long=invalid')
      .expect(400, done);
  });
});

describe('GET /favourites', function () {
  let mongoServer: MongoMemoryServer;
  
  const mockFavourites = [
    {
      eventId: 'Z698xZC2Z17fw8y',
      eventDetails: {
        name: 'Das Große Schlagerfest | Box seat in the Ticketmaster Suite',
        type: 'event',
        id: 'Z698xZC2Z17fw8y',
        url: 'https://www.ticketmaster.de/event/das-grosse-schlagerfest-%7C-box-seat-in-the-ticketmaster-suite-tickets/532439?language=en-us',
      } as any,
    },
  ];

  beforeAll(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/test_gigfinder');

    // Insert mock data into the database
    await Favourite.insertMany(mockFavourites);
  });

  afterAll(async () => {
    // Cleanup: Drop the test database and close the connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('responds with json containing a fav events list', function(done) {
    request(app)
      .get('/api/favourites')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(Array.isArray(res.body)).toBe(true);
        const fav = res.body[0];
        expect(fav).toHaveProperty('eventId', 'Z698xZC2Z17fw8y');
        expect(fav).toHaveProperty('eventDetails');
        expect(fav.eventDetails).toHaveProperty('name', 'Das Große Schlagerfest | Box seat in the Ticketmaster Suite');
        done();
      });
  });
})

describe('POST /favourites', () => {
  let mongoServer: MongoMemoryServer;
  const newFavourite = {
    eventId: 'A12345',
    eventDetails: {
      name: 'New Event',
      url: 'https://www.ticketmaster.com/new-event',
    } as any,
  };

  // Set up the in-memory MongoDB server
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log(`Connecting to test database at ${uri}`);
    await mongoose.connect(uri);
  });

  // Clean up the database and stop the server
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('successfully adds a new favourite', function (done) {
    jest.setTimeout(10000); 
    request(app)
      .post('/api/favourites')
      .send(newFavourite) // Send the new favourite as request body
      .expect('Content-Type', /json/)
      .expect(201) // Expect a 201 Created status
      .end(async function (err, res) {
        if (err) return done(err);

        // Verify the response structure
        expect(res.body).toHaveProperty('eventId', newFavourite.eventId);
        expect(res.body).toHaveProperty('eventDetails');
        expect(res.body.eventDetails).toHaveProperty('name', newFavourite.eventDetails.name);

        // Verify that the data was actually saved in the database
        const savedFavourite = await Favourite.findOne({ eventId: newFavourite.eventId });
        expect(savedFavourite).not.toBeNull();
        expect(savedFavourite?.eventDetails.name).toBe(newFavourite.eventDetails.name);

        done();
      });
  });
});

describe('DELETE, /favourites/:id', () => {
  let mongoServer: MongoMemoryServer;
  let favToDelete: IFav;

  beforeAll(async () => {

    // Start an in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log(`Connecting to test database at ${uri}`);
    
    // Connect to the in-memory MongoDB instance
    await mongoose.connect(uri);

    favToDelete = await Favourite.create({
      eventId: 'DeleteMe123',
      eventDetails: {
        name: 'Event to Delete',
        url: 'https://www.ticketmaster.com/delete-event',
      },
    });
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it('successfully delete the new favourite', function(done) {
    request(app)
      .delete(`/api/favourites/${favToDelete.eventId}`)
      .expect(200)
      .end(async function (err, res) {
        if (err) return done(err);

        expect(res.body).toHaveProperty('message', 'Successfully removed from Favourites')

        const deletedFav = await Favourite.findOne({eventId : favToDelete.eventId})
        expect(deletedFav).toBeNull();

        done();
      })
  })
})