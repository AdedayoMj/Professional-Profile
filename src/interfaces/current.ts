import IUser from './user';

export default interface ICurrent {
    _id: string;
    attribute: string;
    author: string | IUser;
    title: string;
}
