import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationLoginUserInput } from 'src/login/login.input';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    let input: ValidationLoginUserInput = {
      userName: username,
      password: password
    }
    const user = await this.authService.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}