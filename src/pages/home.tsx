
import React from 'react';

import IPageProps from '../interfaces/pages';
import { Container } from 'reactstrap';
import Header from '../components/header';
import HomeGridLayout from '../components/homegridlayout'


const HomePage: React.FunctionComponent<IPageProps> = (props) => {

    return(
        <Container fluid className="p-0">
             <Header name="Dr Oyelola Adegboye" title="Biostatistician">
                 
             </Header>
             <HomeGridLayout/>
        </Container>
    )

}


export default HomePage;

