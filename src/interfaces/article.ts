import IUser from './user';

export default interface IArticle {
    _id: string;
    writer: string;
    author: string | IUser;
    title: string;
    url?: string;
    otherInfo?: string;
    year?: string;
}
