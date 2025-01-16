import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/messages/schemas/message.schema';

@Module({

    imports:[ MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
    providers:[MessagesService],
    exports:[MessagesService]

})
export class MessagesModule {}
