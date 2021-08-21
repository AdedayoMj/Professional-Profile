import React from 'react';
import { Col, Container, Row } from 'reactstrap';

export interface IHeaderProps {
    height?: string;
    image?: string;
    name: string;
    title: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
    const { children, image, title, name, height } = props;

    const headerStyle = {
        background: 'linear-gradient(rgba(36, 20, 38, 0.5), rgba(36, 39, 38, 0.5)), url(' + image + ') no-repeat center center fixed',
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: height
    };
    const textStyle = {
        marginTop: 150
    };

    return (
        <header style={headerStyle}>
            <Container>
                <Row>
                    <Col style={textStyle}>
                        <h1 className="display-4 text-white mt-5 mb-2">{name}</h1>
                        <h3 className="mb-5 text-white">{title}</h3>
                        {children}
                    </Col>
                </Row>
            </Container>
        </header>
    );
};
Header.defaultProps = {
    height: '50vh',
    image: process.env.PUBLIC_URL + 'oyelolaBk.jpg'
};

export default Header;
