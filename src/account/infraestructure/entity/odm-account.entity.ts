import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Document } from "mongoose"
import { OdmSession } from "./odm-session.entity"

@Schema()
export class OdmAccount extends Document {

    @Prop({ type: String, unique: true, index: true, required: true }) 
    id: string
   
    @Prop({ type: String, unique: true, required: true }) 
    email: string
    
    @Prop({ type: String, required: true }) 
    password: string

    @Prop({ type: Boolean, required: true }) 
    twoFA: boolean

    @Prop({ type: [mongoose.Schema.Types.Mixed], required: false }) 
    sessions: OdmSession[];  

}

export const OdmAccountSchema = SchemaFactory.createForClass( OdmAccount )