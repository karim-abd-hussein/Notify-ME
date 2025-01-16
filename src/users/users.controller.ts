import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { IUser} from 'src/users/interfaces/user.interface';
import { UsersService } from './users.service';
import { ValidatePhone, ValidatePhoneName} from 'src/commen/validation';
import ContactDTO from './dtos/contact.dto';
import { Request } from 'express';
import { User } from './schemas/user.schema';
import userDOT from './dtos/user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){}

@Post()
async create(@Body() inputData:ValidatePhoneName):Promise<{message:string,token:string,info:User}> {

   const newUser= await this.usersService.create(inputData);

   return {message:'User signed in successfully!',token:newUser.token,info:newUser.info};
    
}

@Post('log-in')
async logIn(@Body() phone:ValidatePhone):Promise<{message:string,token:string,info:User}> {

   
    const user= await this.usersService.logIn(phone.phone); 

    return{message:'User signed in successfully!',token:user.token,info:user.info};
}

@Get()
async get(@Req() req:Request):Promise<{message:string,info:IUser}>{

   const user= await this.usersService.get(req);
    return {message:"Rtrived info",info:user};
}

@Put('add-contact')
async addContact(@Body() contactDTO:ContactDTO, @Req() req:Request):Promise<{message:string,user:User}>{

  const user= await this.usersService.addContact(contactDTO,req);

   return {message:"Contact added",user};
}


@Delete('delete-contact/:phone')
async deleteContact(@Param() validatePhoneDTO:ValidatePhone, @Req() req:Request):Promise<{message:string,user:User}>{

   const user= await this.usersService.deleteContact(validatePhoneDTO.phone,req);

   return {message:"Contact Deleted",user};
}


@Put('update-contact/:phone')
async updateContacts(@Body() contactDTO:ContactDTO,@Param() validatePhoneDTO:ValidatePhone,@Req() req:Request){


    const user= await  this.usersService.updateContact(validatePhoneDTO.phone,contactDTO,req);
    
    return {message:"User updated",user};
}

@Put('update')
async update(@Body() inputData:userDOT,@Req() req:Request):Promise<{message:string,info:IUser}>{

   const user=await this.usersService.update(inputData,req);

   return {message:"updated user.",info:user};
}


@Delete()
async remove(@Req() req:Request):Promise<{message:string}>{

    await this.usersService.remove(req);

return {message:'Thanks for using Notify ME'};
}


}
