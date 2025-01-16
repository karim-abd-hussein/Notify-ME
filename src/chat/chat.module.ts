import { Module } from '@nestjs/common';
import { ChatGateway} from './chat.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModule } from 'src/messages/messages.module';
import { ActiveUsersModule } from 'src/active-users/active-users.module';

@Module({
  imports:[AuthModule,MessagesModule,ActiveUsersModule],
  providers: [ChatGateway],
})
export class ChatModule {}
