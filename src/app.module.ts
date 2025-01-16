import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ActiveUsersModule } from './active-users/active-users.module';

@Module({
  imports: [
    ChatModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    MessagesModule,
    ActiveUsersModule,
  ],
  providers: [ ChatGateway],
})
export class AppModule {}
