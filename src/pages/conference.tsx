import React from 'react';


import { Container } from 'reactstrap';

export interface IErrorProps {}
const ConferencePage: React.FunctionComponent<IErrorProps> = (props) => {
    const textStyle = {
        margin: 100,
        color: "white",
      };
    return(
        <Container style={textStyle} fluid className="p-0">
            <div>Conference Page</div>
        </Container>
    )
}

export default ConferencePage