import { Module } from '@nestjs/common';
import { ActiveUsersService } from './active-users.service';

@Module({
  providers: [ActiveUsersService],
  exports:[ActiveUsersService]
})
export class ActiveUsersModule {}
