import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateLoginUserInput {
    @Field()
    readonly userName: string;

    @Field()
    readonly password: string;
  
    @Field()
    readonly isActive: boolean;

    @Field()
    readonly userId: number;
}

@InputType()
export class UpdateLoginUserInput {

    @Field()
    readonly id: number;
  
    @Field()
    readonly userName: string;

    @Field()
    readonly password: string;
  
    @Field()
    readonly isActive: boolean;

    @Field()
    readonly userId: number;
}

@InputType()
export class ValidationLoginUserInput {
    
    @Field()
    userName: string;

    @Field()
    password: string;
}