import { AbstractDocument } from "@app/common/database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({versionKey: false})
export class UsersDocument extends AbstractDocument {
    @Prop()
    email: String;

    @Prop()
    password: String;


};

export const UsersSchema = SchemaFactory.createForClass(UsersDocument);
