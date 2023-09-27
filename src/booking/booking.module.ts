
import { BookingSchema } from '../entities/booking.schema';  
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';  
import { BookingService } from './booking.service';
import { CustomerSchema } from 'src/entities/customer.schema';
import { HotelSchema } from 'src/entities/hotel.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }, { name: 'Customer', schema: CustomerSchema } ,{ name: 'Hotel', schema: HotelSchema },]),],  
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}   
