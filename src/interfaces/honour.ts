import IUser from './user';

export default interface IHonours {
    _id: string;
    year: string;
    author: string | IUser;
    title: string;
}
