import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async login(studentNumber: string, passcode: string) {}

  async getLevel(studentNumber: string) {}

  private async validateUser(studentNumber: string, passcode: string) {}
}
