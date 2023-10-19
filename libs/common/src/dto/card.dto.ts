import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CardDto{
    @IsString()
    @IsNotEmpty()
    @Field()
    cvc: string;

    @IsNumber()
    @IsNotEmpty()
    @Field()
    exp_month: number;

    @IsNumber()
    @IsNotEmpty()
    @Field()
    exp_year: number;

    @IsString()
    @IsNotEmpty()
    @Field()
    number: string;
}