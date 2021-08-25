import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_SECRET } from 'src/constants';
import { JwtPayload } from 'src/types/payload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getUser(payload.id);
    if (user.level !== 1) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
