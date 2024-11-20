import mongoose, { Schema, Document, Model } from 'mongoose';

export type EventDetails = Partial<{
  name: string;
}>;

export interface IFav extends Document {
  eventId: String;
  eventDetails: EventDetails;
}

const favouriteSchema: Schema = new Schema({
  eventId: { type: String, required: true },
  eventDetails: { type: Object, required: true}
});

export default mongoose.model<IFav>('Favourite', favouriteSchema);