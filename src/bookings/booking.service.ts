import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Booking } from "./entity/booking.entity";

@Injectable()
export class BookingService{
    constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

    async createBooking(data: any){
      console.log('data',data)
      const result = await this.bookingModel.create(data);
      return result;
    }

    async getBooking(id: string,userId: string) {
      const result = await this.bookingModel.find(
        {
          productId: new Types.ObjectId(id),
          userId:  new Types.ObjectId(userId)
        }
      ).lean();
      return result;
    }

    async getAllBooking(id: string,userId: string){
      const result = await this.bookingModel.find(
        {
          productId: new Types.ObjectId(id),
          userId:  new Types.ObjectId(userId)
        }
      ).lean();
      return result;
    }

}