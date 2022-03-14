import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LoginUsersService } from '../login/login.service';
import { JwtService } from '@nestjs/jwt';
import { ValidationLoginUserInput } from '../login/login.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => LoginUsersService)) private loginUsersService: LoginUsersService,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(input: ValidationLoginUserInput): Promise<any> {
    return await this.loginUsersService.validateUserLogin(input).then(async (result)=>{
      if (result && result.isActive) {
        return await this.usersService.findOneData(result.userId.toString()).then((userresult)=>{
          if (userresult && userresult.isActive) {
            const { ...result } = userresult;
            return result;
          }
        }).catch(error=>console.log(`Error method usersService.findOne:${error}`));

      }
    }).catch(error=>console.log(`Error method loginUsersService.validateUserLogin:${error}`));;

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}