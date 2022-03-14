
import {ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class LoginType {
  
  @Field(() => ID)
  id: number;

  @Field()
  readonly userName: string;

  @Field()
  readonly password: string;

  @Field()
  readonly isActive: boolean;

  @Field()
  readonly userId: number;
}

@ObjectType()
export class AccessTokenType {
  
  @Field()
  readonly access_token: string;

}
