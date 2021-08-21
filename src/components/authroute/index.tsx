import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import logging from '../../config/loggin';

import UserContext from '../../context/user';

export interface IAuthRouteProps {}

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const { children } = props;

    const { user } = useContext(UserContext).userState;

    if (user._id === '') {
        logging.info('Unauthorized, redirecting.');
        return <Redirect to="/" />;
    } else {
        return <>{children}</>;
    }
};

export default AuthRoute;
