import { Role } from 'src/entities/customer.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsEmail, IsNumber, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCustomerDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsMobilePhone()
    @IsNotEmpty()
    mobileNo: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    date_of_birth: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    gender: string;
    
}

    


