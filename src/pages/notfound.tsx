import React from 'react';


import { Container } from 'reactstrap';

export interface IErrorProps {}
const ErrorPage: React.FunctionComponent<IErrorProps> = (props) => {

    return(
        <Container fluid className="p-0">
            <div>Page Not Found</div>
        </Container>
    )
}

export default ErrorPage