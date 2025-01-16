import { ConflictException,Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import Payload  from 'src/auth/interfaces/payload.interface';
import { IUser, IUserInfo } from './interfaces/user.interface';
import IContact from './interfaces/contact.interface';
import { Request } from 'express';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User> ,
        private readonly authService:AuthService
    ){}
              
 async create(userData: Partial<User>): Promise<{token:string,info:User}> {

    try {

      const existUser= await this.userModel.findOne({phone:userData.phone});

        if(existUser)
          throw new ConflictException('You already sign up try to log in');

        const createdUser = new this.userModel(userData);
        await createdUser.save();
        const token =await this.authService.generateToken({phone:userData.phone});

        return {token,info:createdUser};

    } catch (error) {
        throw error instanceof ConflictException
        ? error 
        : new InternalServerErrorException("An error occurred while adding the user. ")
    }

}

  async logIn(phone:string):Promise<{token:string,info:User}>{

    try {      
       const existUser=await this.userModel.findOne({phone});

       if(!existUser){
        throw new NotFoundException('Try to sign up');
       }

       const token = await this.authService.generateToken({phone});

       return {token,info:existUser};

    } catch (error) {
     
        throw error instanceof NotFoundException
        ?error 
        :new InternalServerErrorException("An error occurred while Log in,Please try agin");
    }

}


public async remove(req:Request): Promise<void> {
   
      const payload: Payload = await this.authService.extractTokenAndVerify(req);
      
      try {
      const user = await this.userModel.findOneAndDelete({ phone: payload.phone });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
    } catch (error) {
      throw error instanceof NotFoundException ? error
      : new InternalServerErrorException('An error occurred while remove You.');
    }
  }

 public async addContact(newContact:IContact,req:Request){

  const payload:Payload= await this.authService.extractTokenAndVerify(req);

  const contact:IContact={

    phone:newContact.phone,
    name:newContact.name
  };

  try {
    

    const existUser= await this.userModel.findOne({phone:contact.phone});

    if(!existUser)

      throw new NotFoundException("This user don't have Notify Me app ");

     const updateUser=await this.userModel.findOneAndUpdate(
        {phone:payload.phone},
        { $push: { contacts: contact } },
        { new: true });

        return updateUser
  } catch (error) {

    throw error instanceof NotFoundException
    ? error
    : new InternalServerErrorException('An error occurred while adding the contact.');
    
  }

 }


 async deleteContact(phone:string,req:Request){

  const payload:Payload= await this.authService.extractTokenAndVerify(req);

  try {
    
    const updateUser = await this.userModel.findOneAndUpdate(
      { phone: payload.phone },
      { $pull: { contacts: { phone } } }, 
      { new: true } 
  );
  
  return updateUser;
  } catch (error) {
    
    throw error instanceof NotFoundException
    ? error
    : new InternalServerErrorException('An error occurred while adding the contact.');
    

  }

 }


 async get(req:Request):Promise<IUser>{

  const payload:Payload= await this.authService.extractTokenAndVerify(req);

  try {
    
   return await this.userModel.findOne({phone:payload.phone});

  } catch (error) {
    
    throw new InternalServerErrorException("Can't get the info");

  }

 }


 async updateContact(contactPhone:string,newContactInfo:IUserInfo,req:Request) {
  
  const payload:Payload= await this.authService.extractTokenAndVerify(req);

  try {
    
    const updateUser = await this.userModel.findOneAndUpdate(
      { phone: payload.phone, 'contacts.phone':contactPhone },
      { $set: { 'contacts.$': newContactInfo } },
      { new: true }
    );

    if (!updateUser) {
      throw new NotFoundException(`User with phone ${payload.phone} or contact not found.`);
    }

    return updateUser;
  } catch (error) {
    
    throw error instanceof NotFoundException
    ? error
    :new InternalServerErrorException("An error occurred while adding the new contact.")

  }

 }
 
 async update(newUserInfo:IUserInfo,req:Request):Promise<IUser>{

  const payload:Payload= await this.authService.extractTokenAndVerify(req);

  try {
    const updateUser = await this.userModel.findOneAndUpdate(
      { phone: payload.phone }, 
      { $set: { phone: newUserInfo.phone , name: newUserInfo.name} },
      { new: true } 
    );

    return updateUser;
    
  } catch (error) {
    
    throw new InternalServerErrorException("An error occurred while update the new info.")
  }

 }

}



