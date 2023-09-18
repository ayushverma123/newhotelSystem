import { ConfigService} from '@nestjs/config';
import { ConfigModule} from '@nestjs/config';
import { Config } from 'prettier';
import { HotelModule } from './hotel/hotel.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    ConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI, // Loaded from .ENV
      }),
    }),
    HotelModule,
    BookingModule,
    AuthModule,
    CustomerModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
