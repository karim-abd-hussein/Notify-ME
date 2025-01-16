import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import Payload from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: Payload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<Payload> {
    try {
      return this.jwtService.verify<Payload>(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

   extractToken(req:Request){
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        
      throw new BadRequestException("Token is require,Make sure to inclued ");
    }
    return authHeader.split(' ')[1]; // Extract the token
};

async extractTokenAndVerify(req:Request){

    const token= this.extractToken(req);
   
    return await this.verifyToken(token);

}

}
