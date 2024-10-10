import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class OdmSession extends Document {

    @Prop({ type: String, unique: true, index: true, required: true }) 
    id: string
   
    @Prop({ type: Date, required: true }) 
    expired_at: Date

    @Prop({ type: String, required: false }) 
    ip_address: string

    @Prop({ type: String, required: false }) 
    push_token: string

}

export const OdmSessionSchema = SchemaFactory.createForClass( OdmSession )