import { ValidatePhoneName } from "src/commen/validation";
import { IUserInfo } from "../interfaces/user.interface";

export default class UserDOT extends ValidatePhoneName implements IUserInfo{}