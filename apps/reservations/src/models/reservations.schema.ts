import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
@ObjectType()
export class ReservationsDocument extends AbstractDocument {
    @Prop()
    @Field()
    timestamp: Date;

    @Prop()
    @Field()
    startDate: Date;

    @Prop()
    @Field()
    endDate: Date;

    @Prop()
    @Field()
    userId: string;

    @Prop()
    @Field()
    invoicedId: string;
};

export const ReservationsSchema = SchemaFactory.createForClass(ReservationsDocument);
