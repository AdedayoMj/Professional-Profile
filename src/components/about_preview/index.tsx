import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardImg, Col, Container, Row } from 'reactstrap';
import DownloadLink from '../dowloadlink';

export interface IBlogPreviewProps {
    _id: string;
    title: string;
    author: string;
    content: string;
    resume: string;
    picture?: string;
    createdAt: string;
    updatedAt: string;
    userid: string;
    authorId: string;
}

const AboutPreview: React.FunctionComponent<IBlogPreviewProps> = (props) => {
    const { _id, author, children, createdAt, updatedAt, content, title, userid, authorId } = props;

    const showTime = () => {};
    const fire_token = localStorage.getItem('fire_token');
    return (
        <Container>
            <Container className="mt-5">
                {userid === authorId && (
                    <Container fluid className="p-0">
                        <Button color="info" className="mr-2" tag={Link} to={`/aboutEdit/${_id}`}>
                            <i className="fas fa-edit mr-2"></i>Edit
                        </Button>
                        {/* <Button color="danger" onClick={() => setModal(true)}><i className="far fa-trash-alt mr-2"></i>Delete</Button> */}
                        <hr color="white" />
                        {createdAt !== updatedAt ? (
                            <p>
                                Updated by {author} at {new Date(updatedAt).toLocaleString()}
                            </p>
                        ) : (
                            <p>
                                Posted by {author} at {new Date(createdAt).toLocaleString()}
                            </p>
                        )}
                    </Container>
                )}
            </Container>

            <Row>
                <Col lg="5" style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <Card>
                        <CardImg width="100%" src={process.env.PUBLIC_URL + '/aboutoye.jpg'} />
                    </Card>
                </Col>
                <Col className="justify-content-between " lg="7" style={{ wordSpacing: '0.3rem' }}>
                    <h4 className="text-center" style={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '1rem' }}>
                        {title}
                    </h4>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                    {fire_token !== null ? showTime : ' '}
                    <p>
                        <DownloadLink pathlink={process.env.PUBLIC_URL + '/resume_oyelola.pdf'}>Download Current CV</DownloadLink>
                    </p>
                </Col>

                {children}
            </Row>
        </Container>
    );
};

export default AboutPreview;
