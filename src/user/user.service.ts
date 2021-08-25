import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userId: string, studentNumber: string, password: string) {
    const user = await this.userRepository.create({
      userId,
      studentNumber,
      password: bcrypt.hashSync(password, 10),
    });
    await this.userRepository.save(user);
    return user;
  }

  async getUser(id: number) {
    return this.userRepository.findOne(id);
  }

  async getUserByStudentNumber(studentNumber: string) {
    return this.userRepository.findOne({ studentNumber });
  }

  async changePassword(id: number, password: string) {
    return this.userRepository.update(id, { password });
  }
}
