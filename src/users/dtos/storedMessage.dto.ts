import { ValidatePhone } from "src/commen/validation";
import { IStoredMessage } from "../interfaces/storedMessages.interface";
import { IsNotEmpty, IsString } from "class-validator";

export default class StoredMessage extends ValidatePhone implements IStoredMessage{

    @IsNotEmpty({ message: 'Content is required' })
      @IsString({ message: ' Content must be a string' })
      content: string;
}