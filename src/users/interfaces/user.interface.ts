export interface IUserInfo{

    phone:string;
    name:string;

}

export interface IUser extends IUserInfo{

    contacts:IUserInfo[]

}