import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

export interface ICenterPieceProps {
    header:any
}

const CenterPiece: React.FunctionComponent<ICenterPieceProps> = props => {
    const { children,header } = props;

    return (

        <Container  style={{marginTop:110,}}>
            <Row>
                <Col 
                    xs={{ size: 10, offset: 1 }} 
                    sm={{ size: 8, offset: 2 }} 
                    md={{ size: 6, offset: 3 }} 
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card className='mt-5' bg='primary'>
                        <CardHeader className=" text-white" style={{backgroundColor:'#0C2D48'}}>
                            {header}
                        </CardHeader>
                        <CardBody>
                            {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}



export default CenterPiece;