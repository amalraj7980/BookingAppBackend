import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBooking } from "./dtos/booking.dto";


@Controller('booking')
export class BookingController{
    constructor(private bookingService: BookingService) {}
    @Post()
    async createBooking(@Body() createBooking: CreateBooking){
        return await this.bookingService.createBooking(createBooking);
    }

    @Get(':id')
    async getBooking(@Query('id') id: string,@Query('userId') userId: string){
        return await this.bookingService.getBooking(id,userId);
    }

    @Get('all')
    async getAllBooking(@Query('id') id: string,@Query('userId') userId: string,){
        return await this.bookingService.getAllBooking(id,userId);
    }

   

}