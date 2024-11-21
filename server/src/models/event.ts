import mongoose, { Schema, Document, Model } from 'mongoose';

// define an interface for the Event schema
export interface IEvent extends Document {
  name: String; 
  date: Date;
  venue: String;
  longitude: Number;
  latitude: Number;
  image?: String;
}


const eventSchema: Schema<IEvent> = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  image: { type: String },
});

export default mongoose.model<IEvent>('Event', eventSchema);