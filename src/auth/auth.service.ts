import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/types/payload';
import { JWT_SECRET } from 'src/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(studentNumber: string, password: string) {
    const user = await this.validateUser(studentNumber, password);
    return await this.generateJwt(user);
  }

  async getLevel(studentNumber: string) {
    const user = await this.userService.getUserByStudentNumber(studentNumber);
    return user.level;
  }

  private async validateUser(studentNumber: string, password: string) {
    const user = await this.userService.getUserByStudentNumber(studentNumber);
    if (!user) {
      throw new HttpException(
        { message: 'INVALID_STUDENT_NUMBER' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new HttpException(
        { message: 'INVALID_PASSCODE' },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  private async generateJwt(user: User) {
    const { studentNumber, id, level } = user;
    const payload: JwtPayload = { studentNumber, level, id };
    return await this.jwtService.signAsync(payload, { secret: JWT_SECRET });
  }
}
