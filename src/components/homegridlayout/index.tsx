import React from 'react';
import { Container } from 'reactstrap';
import GridBoxPage from '../gridbox';

export interface IGridLayout {}

const HomeGridLayout: React.FunctionComponent<IGridLayout> = (props) => {
    const GridHeadings = [
        {
            title: 'About',
            image: '/about.jpg',
            link: '/about'
        },
        {
            title: 'Publications',
            image: '/publications.jpg',
            link: '/article'
        },
        {
            title: 'Sights & Sound',
            image: '/outing.jpg',
            link: '/engagement'
        },
        {
            title: 'Academic',
            image: '/academic.jpg',
            link: '/academic'
        },
        {
            title: 'Current Research',
            image: '/research.jpg',
            link: '/current'
        },
        {
            title: 'Honours',
            image: '/awards.jpg',
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
