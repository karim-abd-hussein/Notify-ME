import { ValidatePhone, ValidatePhoneName } from "src/commen/validation";
import IContact from "../interfaces/contact.interface";

export default class ContactDTO extends ValidatePhoneName implements IContact{}