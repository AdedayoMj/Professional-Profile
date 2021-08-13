import IRoute from '../interfaces/routes';
import BioPage from '../pages/author-bio';
import BooksPage from '../pages/books';
import ConferencePage from '../pages/conference';
import HomePage from '../pages/home';
import ErrorPage from '../pages/notfound';

const mainRoutes: IRoute[] = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        component: HomePage,
        auth: false
        
    },
    {
        name: 'Bio',
        path: '/bio',
        exact: true,
        component: BioPage,
        auth: false
    },
    {
        name: 'Books',
        path: '/books',
        exact: true,
        component: BooksPage,
        auth: false
    },
    {
        name: 'Conference',
        path: '/conference',
        exact: true,
        component: ConferencePage,
        auth: false
    }
];

const ErrorRoutes: IRoute[] = [
    {
        name: 'Error',
        path: '/notfound',
        exact: true,
        component: ErrorPage,
        auth: false
    }
];

const routes: IRoute[] = [...mainRoutes, ...ErrorRoutes];

export default routes;