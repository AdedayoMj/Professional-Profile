import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, Col, Container, Row } from 'reactstrap';

interface GridHeadings {
    title: string;
    image: string;
    link: string;
}

interface IGridProps {
    headingsArray: GridHeadings[];
}

const GridBoxPage: React.FunctionComponent<IGridProps> = (props) => {
    const { headingsArray } = props;

    return (
        <Container fluid style={{ display: 'flex', flexDirection: 'row' }}>
            <Row>
                {headingsArray.map(function (item, index) {
                    return (
                        <Col key={index} sm="4">
                            <div style={{ fontSize: '1.3rem', letterSpacing: '0.2rem', marginBottom: '1rem', marginTop: '2rem', fontWeight: 'bold' }}>{item.title}</div>

                            <Card tag={Link} to={item.link} style={{ flex: 1, marginBottom: '1rem' }}>
                            <CardImg width="100%" src={item.image} alt={item.title} />
                                {/* <CardImg width="100%" src={process.env.PUBLIC_URL + item.image} alt={item.title} /> */}
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default GridBoxPage;
