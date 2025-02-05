import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { BookingModule } from './bookings/booking.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'),ProductModule,BookingModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
