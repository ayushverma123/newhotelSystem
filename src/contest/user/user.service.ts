import { User } from 'src/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { Customar } from 'src/entities/customer.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { createQuizDto } from '../quiz/quiz-dto';
import { CreateuserDto } from './createUser-dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,
              @InjectModel(Customar.name) private readonly customerModel: Model<Customar>,) { }

  async create(userDto: CreateuserDto) {
    const { userid, ...userData } = userDto;
    const customer = await this.customerModel.findById(userid);
    if (!customer) {
      throw new NotFoundException("Invalid user");
    }
    const newUserData = {
      ...userData,
      userid: customer._id,
    };

    const existingUser = await this.userModel.findOne({
         userid: userDto.userid,
         quizid: userDto.quizid
    });

    if (existingUser) {
      // Customer with the same details already exists, throw an error
      throw new NotFoundException('User already exist');
    }
    else {
      const createduser = await this.userModel.create(newUserData);
      await createduser.save();
      const userWithQuiz = await this.userModel
      .findById(createduser._id)
      .populate('quizid')
      .exec();
      return {
        code: 200,
        message: 'User created successfully',
        status: 'success',
        data: userWithQuiz,
      };
    }
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userModel.findById(id).populate('quizid').exec();
  }

  async getUsersQuiz(): Promise<User[]> {
    return this.userModel.find().populate('quizid').exec();
  }

  async updateUser(id: string, updateDto: CreateuserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}