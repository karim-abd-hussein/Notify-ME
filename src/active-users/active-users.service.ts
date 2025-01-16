import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ActiveUsersService {

     //  This system work as key value piar Socket id =phone number
     private usersOnlineKeyValue=new Map<string,string>();
     private usersOnlineValueKey=new Map<string,string>();
   
     public addUser(client:Socket,phone:string){
   
       this.usersOnlineKeyValue.set(client.id,phone);
       this.usersOnlineValueKey.set(phone,client.id);
   
     }
   
     public removeUser(client:Socket){
   
       this.usersOnlineValueKey.delete(this.usersOnlineKeyValue.get(client.id));
       this.usersOnlineKeyValue.delete(client.id);

     }
   
     public getPhone(client:Socket){
   
       return this.usersOnlineKeyValue.get(client.id);
   
     }  
   
     public getClientId(phone:string){
   
       return this.usersOnlineValueKey.get(phone);
   
     }

}
