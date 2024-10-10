import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class OdmNotification extends Document {

    @Prop({ type: String, unique: true, index: true, required: true }) 
    id: string
   
    @Prop({ type: String, required: true }) 
    account_id: string

    @Prop({ type: String, required: true }) 
    title: string
    
    @Prop({ type: String, required: true }) 
    body: string
    
    @Prop({ type: Date, required: true }) 
    sended_at: Date
    
    @Prop({ type: Boolean, required: true }) 
    readed: boolean   

}

export const OdmNotificationSchema = SchemaFactory.createForClass( OdmNotification )