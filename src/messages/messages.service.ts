import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/messages/schemas/message.schema';
import IOfflineMessage from './interfaces/offline-message.interface';

@Injectable()
export class MessagesService {

    constructor(@InjectModel(Message.name) private messageModel: Model<Message> ){}
    
     public  async addMessage(payload:IOfflineMessage):Promise<void>{
    
      try {

      await new this.messageModel(payload).save();
        
      } catch (error) {
        
        throw new InternalServerErrorException('Failed to save message');
      }
       
      }
    
      public async getReceiverMessages(receiver:string):Promise<IOfflineMessage[]>{

        try {
        
          const messages:IOfflineMessage[]=await this.messageModel.find({to:receiver});
          await this.messageModel.deleteMany({to:receiver});
          return messages;

        } catch (error) {
          
          throw new InternalServerErrorException('Failed to retrive messages');    
        
        }
        
    
      }

}
