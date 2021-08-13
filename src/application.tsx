import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import routes from './config/routes';
import Naviagtion from './components/navigation';
import FooterPage from './components/footer';

export interface IApplicationProps{}

const Application: React.FunctionComponent<IApplicationProps> = props => {
return (
    <>
    <Naviagtion/>
    <Switch>
    {routes.map((route, index) => {
        
            return( <Route
                key={index}
                exact={route.exact}
                path={route.path}
                render={(routeProps: RouteComponentProps) => <route.component {...routeProps} />}
                />)
        
  
    })}
    </Switch>
   <FooterPage/>
    </>
)
}

export default Application;