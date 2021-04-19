import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Coffee extends Document {
    @Prop()
    name: string;

    @Prop()
    brand: string;

    @Prop([String])
    flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);
