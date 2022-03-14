import { HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccessTokenType, LoginType } from './login.dto';
import { CreateLoginUserInput, UpdateLoginUserInput, ValidationLoginUserInput } from './login.input';
import { LoginUsersService } from './login.service';
import { CurrentUser } from '../decorators/user.decorator';
import { UserType } from '../users/user.dto';
import { GraphqlAuthGuard } from 'src/auth/GraphqlAuthGuard ';

@Resolver()
export class LoginUserResolver {
    
    constructor(
        private readonly loginService: LoginUsersService,
    ) {
        
    }

    @Mutation(returns => AccessTokenType,{ name: 'login' })
    async login(@Args('input') input:  ValidationLoginUserInput){
        return this.loginService.validateLogin(input);
    }

    @Mutation(returns => LoginType,{ name: 'validateUserLogin' })
    async validateUserLogin(@Args('input') input:  ValidationLoginUserInput){
        return this.loginService.validateUserLogin(input);
    }

    @Mutation(() => LoginType,{ name: 'createLoginUser' })
    @UseGuards(GraphqlAuthGuard)
    async create(@Args('input') input: CreateLoginUserInput ) {
        return this.loginService.create(input);
    }

    @Mutation(returns => LoginType,{ name: 'updateLoginUser' })
    @UseGuards(GraphqlAuthGuard)
    async update(@Args('id') id: number, @Args('input') input:  UpdateLoginUserInput ) {
        return await this.loginService.update(id, input).then(result=>{
            if (result) {
                return result;
            }
            return null;
        }).catch(error=> {return error});
    }

    @Mutation(returns => String,{ name: 'deleteLoginUser' })
    @UseGuards(GraphqlAuthGuard)
    async delete(@Args('id') id: number) {
        const result = await this.loginService.delete(id).then(result=>{
            if (result) {
                return 'Ok';
            }
            return 'error';
        }).catch(error=> {return error});
    }

    @Query(() => UserType,{ name: 'whoAmI' })
    @UseGuards(GraphqlAuthGuard)
    async whoAmI(@CurrentUser() login: any) {
      return this.loginService.whoAmI(login.
        username.toString())
      .then(result=>{
            if (result) {
                return result;
            }
        }).catch(error=> {return error});;
    }

}