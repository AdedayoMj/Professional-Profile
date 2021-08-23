import React from 'react';
import { Container } from 'reactstrap';
import GridBoxPage from '../gridbox';
import * as about from '../../assets/images/about.jpg';
import * as publications from '../../assets/images/publications.jpg';
import * as outing from '../../assets/images/outing.jpg';
import * as academic from '../../assets/images/academic.jpg';
import * as research from '../../assets/images/research.jpg';
import * as awards from '../../assets/images/awards.jpg';

export interface IGridLayout {}

const HomeGridLayout: React.FunctionComponent<IGridLayout> = (props) => {
    const GridHeadings = [
        {
            title: 'About',
            image: about.default,
            link: '/about'
        },
        {
            title: 'Publications',
            image: publications.default,
            link: '/article'
        },
        {
            title: 'Sights & Sound',
            image: outing.default,
            link: '/engagement'
        },
        {
            title: 'Academic',
            image: academic.default,
            link: '/academic'
        },
        {
            title: 'Current Research',
            image: research.default,
            link: '/current'
        },
        {
            title: 'Honours',
            image: awards.default,
            link: '/honours'
        }
    ];

    return (
        <Container>
            <GridBoxPage headingsArray={GridHeadings} />
        </Container>
    );
};

export default HomeGridLayout;
