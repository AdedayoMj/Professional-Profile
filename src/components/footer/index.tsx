import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Container from "reactstrap/es/Container";


export interface INavigationProps {}

const FooterPage: React.FunctionComponent<INavigationProps> = (props) => {
const list=["Bio","Contact", "Publications", "Resume"]
const navigate=["/bio", "/contact", "/conference", "/resume"]
    return(
        <footer className="footer" style={{ backgroundColor:"white"}}>
           <br/>
            <Container fluid className="text-center text-md-left">
        <Row>
          <Col md="6">
            <h5 className="title">About Author</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </Col>
          <Col md="6">
            <h5 className="title">Quick Links</h5>
            <ul  >
            {list.map(function (item, index) {
              return <li  className="list-unstyled">
                <Link to={navigate[index]} style={{color:'blue'}}>{item}</Link>
              </li>
            })}
              
            </ul>
          </Col>
          
        </Row>
      </Container>
            <div className="footer-copyright text-center py-3">
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://adedayoadegboye.xyz" rel="noopener noreferrer" target="_blank" style={{color:"blue"}}> adedayoadegboye.xyz </a>
        </Container>
      </div>
        </footer>
    )
}

export default FooterPage;