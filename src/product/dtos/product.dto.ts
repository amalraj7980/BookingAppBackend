import { IsBoolean, IsDate, IsString } from "class-validator";

export class CrateProductDto{
    
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    image: string;

    @IsBoolean()
    isBooked: boolean;

    @IsDate()
    dateBooked: Date;
}