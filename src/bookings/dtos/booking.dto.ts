import {IsBoolean, IsDate, IsString } from "class-validator";

export class CreateBooking{
    
    @IsString()
    userId: string;

    @IsString()
    productId: string;

    @IsDate()
    bookedDate: Date;

    @IsBoolean()
    isBooked: boolean
}