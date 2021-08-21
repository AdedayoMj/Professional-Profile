import IUser from './user';

export default interface ISight {
    _id: string;
    title: string;
    author: string | IUser;
    picture: string;
}
