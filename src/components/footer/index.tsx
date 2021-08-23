import React from 'react';
import { Row } from 'reactstrap';
import Container from 'reactstrap/es/Container';

// import VideoPlayer from '../videoplayer';
import './footer.css';

export interface INavigationProps {}

const FooterPage: React.FunctionComponent<INavigationProps> = (props) => {
    return (
        <footer className="footer" style={{ backgroundColor: 'white' }}>
            <br />
            <hr />
            <Row>
                <Container fluid className="text-center py-3">
                    <h5>Social Media</h5>
                    <Row style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {/* <VideoPlayer logo={process.env.PUBLIC_URL + 'oyelolaBk.jpg'} video={process.env.PUBLIC_URL + '7news.mp4'} /> */}
                        <ul className="social-menu ">
                            <li>
                                <a href="https://www.facebook.com/prince.oyelola.3">
                                    <i className="fab fa-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/oyelola-adegboye-phd-cstat-csci-fimc-cmc-15495423/">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                        </ul>
                        {/* <VideoPlayer logo={process.env.PUBLIC_URL + 'oyelolaBk.jpg'} video={process.env.PUBLIC_URL + 'WIN_news.mp4'} /> */}
                    </Row>
                </Container>
            </Row>
            <div className="footer-copyright text-center py-3">
                <Container fluid>
                    &copy; {new Date().getFullYear()} Copyright:{' '}
                    <a href="https://www.linkedin.com/in/majeed-adegboye-47189142/" rel="noopener noreferrer" target="_blank" style={{ color: 'blue' }}>
                        {' '}
                        Adedayo Adegboye{' '}
                    </a>
                </Container>
            </div>
        </footer>
    );
};

export default FooterPage;
