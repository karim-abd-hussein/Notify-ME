import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUserInfo } from '../interfaces/user.interface';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        phone: { type: String, required: true },
      },
    ],
    default: [], // Default to an empty array
  })
  contacts: IUserInfo[];

}

export const UserSchema = SchemaFactory.createForClass(User);
