import { Controller, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const accessToken = await this.authService.login(
      req.body.studentNumber,
      req.body.password,
    );
    return {
      accessToken,
    };
  }
}
