import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
export class ReservationsDocument extends AbstractDocument {
    @Prop()
    timestamp: Date;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    userId: string;

    @Prop()
    invoicedId: string;
};

export const ReservationsSchema = SchemaFactory.createForClass(ReservationsDocument);
