import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUserInfo } from '../interfaces/user.interface';
import { IStoredMessage } from '../interfaces/storedMessages.interface';

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

  @Prop({
    type: [
      {
        content: { type: String, required: true },
        phone: { type: String, required: true },
      },
    ],
    default: [], // Default to an empty array
  })
  messagesFrom:IStoredMessage[];

  @Prop({
    type: [
      {
        content: { type: String, required: true },
        phone: { type: String, required: true },
      },
    ],
    default: [], // Default to an empty array
  })
  messagesTo: IStoredMessage[];

}

export const UserSchema = SchemaFactory.createForClass(User);
