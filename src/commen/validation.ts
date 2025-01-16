import { IsNotEmpty, IsString, Matches, IsPhoneNumber } from 'class-validator';

export class ValidatePhone{

    @IsNotEmpty({ message: 'Phone number is required' })
    @Matches(/^[0-9]{10}$/, { message: 'Phone number must be 10 digits' })
    phone: string;

}


export class ValidatePhoneName extends ValidatePhone {
   
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

}
