import React from 'react';


import { Container } from 'reactstrap';

export interface IErrorProps {}
const BioPage: React.FunctionComponent<IErrorProps> = (props) => {
    const textStyle = {
        margin: 100,
        color: "white",
      };
    return(
        <Container style={textStyle} fluid className="p-0">
            <div>Author Bio</div>
        </Container>
    )
}

export default BioPage