import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ActiveUsersModule } from './active-users/active-users.module';

// 'mongodb+srv://karim:09912.45@cluster0.o0w7c.mongodb.net/NotifyME?retryWrites=true&w=majority&appName=Cluster0'
@Module({
  imports: [
    ChatModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/notifyME'),
    AuthModule,
    MessagesModule,
    ActiveUsersModule,
  ],
  providers: [ ChatGateway],
})
export class AppModule {}
