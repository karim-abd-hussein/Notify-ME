import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports:[
        JwtModule.registerAsync({
            imports: [ConfigModule], 
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              secret: configService.get<string>('SECRET_KEY'), 
              signOptions: { expiresIn: '10h' },
            }),
          })],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule {}
