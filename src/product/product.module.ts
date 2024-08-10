import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './entities/product.entity';
import { BookingService } from 'src/bookings/booking.service';
import { BookingModule } from 'src/bookings/booking.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),BookingModule],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}