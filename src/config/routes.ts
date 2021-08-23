import IRoute from '../interfaces/routes';
import CurrentProjectPage from '../pages/currentproject';
import HomePage from '../pages/home';
import ErrorPage from '../pages/notfound';
import AboutPage from '../pages/about';
import HonoursPage from '../pages/Honours';
import ArticlePage from '../pages/articles';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import ForgotPasswordChange from '../pages/forgot';
import ChangePasswordPage from '../pages/changepassword';
import ResetPasswordPage from '../pages/reset';
import AboutEditPage from '../pages/about_edit';
import ArticleEditPage from '../pages/article_edit';
import AwardsEditPage from '../pages/award_edit';
import FellowshipEditPage from '../pages/fellowship_edit';
import OtherHonorEditPage from '../pages/other_honor_edit';
import MemberEditPage from '../pages/member_edit';
import CurrentEditPage from '../pages/currentprojectedit';
import SightEditPage from '../pages/sight_edit';
import SightSoundPage from '../pages/sight_sound';
import WatchPage from '../pages/watch';

const authRoutes: IRoute[] = [
    {
        name: 'Login',
        path: '/admin/login',
        exact: true,
        component: LoginPage,
        auth: false
    },

    {
        name: 'Forget Password Page',
        path: '/admin/forget',
        exact: true,
        component: ForgotPasswordChange,
        auth: false
    },
    {
        name: 'Reset Password Page',
        path: '/admin/reset',
        exact: true,
        component: ResetPasswordPage,
        auth: false
    }
];

const mainRoutes: IRoute[] = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        component: HomePage,
        auth: false
    },
    {
        name: 'Current Project',
        path: '/current',
        exact: true,
        component: CurrentProjectPage,
        auth: false
    },
    {
        name: 'About',
        path: '/about',
        exact: true,
        component: AboutPage,
        auth: false
    },
    {
        name: 'Article',
        path: '/article',
        exact: true,
        component: ArticlePage,
        auth: false
    },
    
    {
        name: 'Video Watch',
        path: '/watch',
        exact: true,
        component: WatchPage,
        auth: false
    },
    {
        name: 'Honours',
        path: '/honours',
        exact: true,
        component: HonoursPage,
        auth: false
    },
    {
        name: 'Sights',
        path: '/sight',
        exact: true,
        component: SightSoundPage,
        auth: false
    }
];
const aboutRoutes: IRoute[] = [
    {
        name: 'Create About',
        path: '/aboutEdit',
        exact: true,
        component: AboutEditPage,
        auth: true
    },
    {
        name: 'Create Sight and Sound',
        path: '/sightEdit',
        exact: true,
        component: SightEditPage,
        auth: true
    },
    {
        name: 'Create Award',
        path: '/editAward',
        exact: true,
        component: AwardsEditPage,
        auth: true
    },
    {
        name: 'Create Article',
        path: '/articleEdit',
        exact: true,
        component: ArticleEditPage,
        auth: true
    },
    {
        name: 'Create Fellowhsip',
        path: '/editFellow',
        exact: true,
        component: FellowshipEditPage,
        auth: true
    },
    {
        name: 'Create Membership',
        path: '/editMember',
        exact: true,
        component: MemberEditPage,
        auth: true
    },
    {
        name: 'Create Other Honours',
        path: '/editOtherHonour',
        exact: true,
        component: OtherHonorEditPage,
        auth: true
    },
    {
        name: 'Create Current Project',
        path: '/editCurrentProject',
        exact: true,
        component: CurrentEditPage,
        auth: true
    },
    {
        name: 'Change Password Page',
        path: '/admin/change',
        exact: true,
        component: ChangePasswordPage,
        auth: true
    },
    {
        name: 'Sign Up',
        path: '/admin/register',
        exact: true,
        component: RegisterPage,
        auth: true
    },
    {
        name: 'Edit',
        path: '/aboutEdit/:aboutID',
        exact: true,
        component: AboutEditPage,
        auth: true
    },
    {
        name: 'Edit',
        path: '/articleEdit/:articleID',
        exact: true,
        component: ArticleEditPage,
        auth: true
    },
    {
        name: 'Awards',
        path: '/editAward/:awardID',
        exact: true,
        component: AwardsEditPage,
        auth: true
    },
    {
        name: 'Fellowship',
        path: '/editFellow/:fellowID',
        exact: true,
        component: FellowshipEditPage,
        auth: true
    },
    {
        name: 'Membership',
        path: '/editMember/:memberID',
        exact: true,
        component: MemberEditPage,
        auth: true
    },
    {
        name: 'Other Awards',
        path: '/editOtherHonour/:otherID',
        exact: true,
        component: OtherHonorEditPage,
        auth: true
    },
    {
        name: 'Create Current Project',
        path: '/editCurrentProject/:currentID',
        exact: true,
        component: CurrentEditPage,
        auth: true
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

const routes: IRoute[] = [...mainRoutes, ...ErrorRoutes, ...authRoutes, ...aboutRoutes];

export default routes;
