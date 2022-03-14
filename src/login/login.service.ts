import { Injectable ,Inject, forwardRef, UnauthorizedException} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';

import { LoginUser } from '../models/login.model';
import { LoginType } from './login.dto';
import {CreateLoginUserInput, UpdateLoginUserInput, ValidationLoginUserInput } from './login.input';
import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUsersService {

  constructor(
    @Inject('LOGINUSERS_REPOSITORY')
    private readonly userRepository: typeof LoginUser,
    @Inject(forwardRef(() => AuthService))private authService: AuthService,
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateLogin(input: ValidationLoginUserInput){
    return await this.validateUserLogin(input).then(async (result)=>{
        if (result && result.isActive) {
          const payload = { username: result.userName, sub: result.userId };
          return {
            access_token: this.jwtService.sign(payload),
          };
        }
        else {
          throw new UnauthorizedException();
        }
      }).catch(error=>console.log(`Error method loginUsersService.validateUserLogin:${error}`));
  }

  async validateUser(input: ValidationLoginUserInput): Promise<LoginUser> {
    return await this.validateUserLogin(input);
    // let result = await this.validateUserLogin(input).then(async (result)=>{
    //   if (result && result.isActive) {
    //     return result;
    //   }
    //   else {
    //     return null;
    //   }
    // }).catch(error=>console.log(`Error method loginUsersService.validateUserLogin:${error}`));;

    // return result;
  }

  async whoAmI(userName:string): Promise<User>{
    return this.userRepository.findOne({
      raw:true,
      where: {
        userName : userName
      }
    }).then(response=>{
      if(response){
        return this.userService.findOneData(response.userId.toString()).then(userResponse =>{
          return userResponse;
        })
      }
    });
  }

  async validateUserLogin(input: ValidationLoginUserInput): Promise<LoginUser> {
    let userName = input.userName;
    let password = input.password;
    let result = this.userRepository.findOne({
      raw:true,
      where: {
        userName:userName,
        password:password,
      },
    });
    return result;
  }

  async findAll(): Promise<LoginUser[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<LoginUser> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async create(createUserDto: CreateLoginUserInput): Promise<LoginType> {
    const user = new LoginUser();
    user.userName = createUserDto.userName;
    user.password = createUserDto.password;
    user.isActive = true;
    return await user.save();
  }

  async update(id: number, user: UpdateLoginUserInput): Promise<LoginType | boolean> {
    const obj = await this.userRepository.findOne<LoginUser>({
      where: { id, isActive: true },
    });
    if (obj === null || Object.keys(obj).length === 0) {
      return false;
    }

    obj.userName = user.userName;
    obj.password = user.password;
    obj.isActive = user.isActive;
    return await obj.save();
  }

  async delete(id: number): Promise<LoginType | boolean> {
    const obj = await this.userRepository.findOne<LoginUser>({
      where: { id, isActive: true },
    });
    if (obj === null || Object.keys(obj).length === 0) {
      return false;
    }
    obj.isActive = false;
    return await obj.save();
  }
}