import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop()
  userId: string;

  @Prop()
  productId: string

  @Prop()
  bookedDate: Date;

  @Prop()
  isBooked: boolean;


}

export const BookingSchema = SchemaFactory.createForClass(Booking);