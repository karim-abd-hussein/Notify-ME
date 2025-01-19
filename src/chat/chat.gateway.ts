import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ActiveUsersService } from 'src/active-users/active-users.service';
import { AuthService } from 'src/auth/auth.service';
import Payload from 'src/auth/interfaces/payload.interface';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET,POST'], 
  },
  transports: ['websocket'], 
}) // Default: Port 3000
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly activeUsers: ActiveUsersService,
    private readonly messagesServices: MessagesService,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket): Promise<void> {
    try {
      const token = client.handshake.query.token as string;

      if (!token) {
        client.emit('error', { message: 'Token is required' });
        client.disconnect();
        return;
      }

      const payload: Payload = await this.authService.verifyToken(token);
      const messages = await this.messagesServices.getReceiverMessages(payload.phone);
      messages.forEach(message => {
        client.emit('message', { from: message.from, content: message.content });
      });

      this.activeUsers.addUser(client, payload.phone);

    } catch (error) {
      if (error.name === 'UnauthorizedException') {
        client.emit('error', { message: 'Invalid or expired token' });
      } else {
        client.emit('error', { message: 'Internal server error' });
      }
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    this.activeUsers.removeUser(client);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { to: string; content: string }): void {
    console.log(payload);
    const from = this.activeUsers.getPhone(client);
    const to = this.activeUsers.getClientId(payload.to);

    if (to) {
      this.server.to(to).emit('message', { from, content: payload.content });
    } else {
      this.messagesServices.addMessage({ from, to: payload.to, content: payload.content });
    }
  }
}
