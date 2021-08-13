import React from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import imageProfile from '../../assets/images/oyelolaBk.jpeg';

export interface IHeaderProps {
  height?: string;
  image?: string;
  book: string;
  author: string;
  conference: string;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { children, image, book, author, conference } = props;
  const list = [book, conference, author];
  const ref = ["/books", "/conference", "/bio"];
  const headerStyle = {
    background:
      "linear-gradient(rgba(36, 20, 38, 0.5), rgba(36, 39, 38, 0.5)), url(" +
      image +
      ") no-repeat center center fixed",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "100vh",
  };
  const textStyle = {
    marginTop: 200,
    textDecoration: "underline",
    textDecorationColor: "white",
    color: "white",
    letterSpacing:2,
    fontSize:35,

  };

  return (
    <header style={headerStyle}>
      <Container>
        <Row>
          <div style={textStyle}>
            <ul>
              {list.map(function (item, index) {
                return (
                  <ul>
                    <div style={{marginTop:25}}><Link style={{color:'white'}} to={ref[index]}>{item}</Link></div>
                  </ul>
                );
              })}
            </ul>

            {children}
          </div>
        </Row>
      </Container>
    </header>
  );
};
Header.defaultProps = {
  // height: '100%',
  image:imageProfile,
    
};

export default Header;
