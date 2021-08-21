import IUser from './user';

export default interface IBlog {
    _id: string;
    title: string;
    author: string | IUser;
    content: string;
    resume: 'unknown';
    picture?: string;
    createdAt: string;
    updatedAt: string;
}
