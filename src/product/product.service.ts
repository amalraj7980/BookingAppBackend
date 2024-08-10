import { BadRequestException, Injectable } from "@nestjs/common";
import { CrateProductDto } from "./dtos/product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./entities/product.entity";
import { Model, Types } from "mongoose";
import { BookingService } from "src/bookings/booking.service";

@Injectable()
export class ProductService{
    constructor(@InjectModel(Product.name) private productModel: Model<Product>,
    private bookingService: BookingService) {}

    async createProduct(data: CrateProductDto){
      const result = await this.productModel.create(data);
      return result;
    }

    async findAllProducts(){
        const result = await this.productModel.find().lean();
        return result;
    }


    async bookItem(id: string, userId: string, date: string){     
        const product = await this.productModel.findOne({_id: new Types.ObjectId(id)}).lean();
        if(!product) throw new BadRequestException("Product does not exist");
        const booking = await this.bookingService.getBooking(id,userId);
        for (const bookings of booking) {
            console.log(bookings.bookedDate)
            const formattedBookedDate = bookings.bookedDate.getTime()
            console.log(date,formattedBookedDate)    
            if (new Date(date).getTime() === formattedBookedDate) {
                throw new BadRequestException("Item already booked for the specific date");
            }
        }
        const bookingData = {
            productId: product?._id,
            userId: new Types.ObjectId(userId),
            bookedDate: date,
            isBooked: true
        }
       return await this.bookingService.createBooking(bookingData)

    }

}