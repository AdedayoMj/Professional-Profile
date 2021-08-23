import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Card, CardImg, Col, Container, Modal, ModalBody, ModalFooter, Row } from 'reactstrap';
// import ISight from '../../interfaces/sight';
// import * as awards from '../../assets/images/awards.jpg';
// import Img from 'react-cool-img';
// import loadingImage from '../../assets/images/loading.gif';
// import errorImage from '../../assets/images/error.svg';


interface IGridProps {
    sightsArray: IModalProps[];
}
interface IModalProps{
    title:string,
    picture:string,
}
const CardTemplate: React.FunctionComponent<IGridProps> = (props) => {
    const [modal, setModal] = useState(false);
    const [modaltitle, setModalTitle] = useState('');
    const [modalpicture, setModalPicture] = useState('');
    const { sightsArray } = props;
    // const fire_token = localStorage.getItem('fire_token');
    const toggleModal = () => setModal(!modal);
    const handlePassInfoShow = (data: IModalProps)=>{
        setModal(true);
        setModalTitle(data.title);
        setModalPicture(data.picture);
       }
    return (
        <section style={{ marginBottom: '3rem' }}>
            {/* <Container style={{ background: 'whitesmoke' }}>
                <Row style={{ justifyContent: 'space-between' }}>
                    <h5>Sights</h5>
                    <span>
                        {' '}
                        {fire_token != null ? (
                            <Button color="info" className="mr-2" tag={Link} to={`/sightEdit`}>
                                <i className="fas fa-plus mr-2"></i>Add
                            </Button>
                        ) : (
                            ''
                        )}
                    </span>
                </Row>
            </Container> */}
            <hr />
            <Container fluid style={{ display: 'flex', flexDirection: 'row' }}>
                <Row>
                    {sightsArray.map(function (item, index) {
                        return (
                            <Col key={index} sm="4">
                                <Modal className="modal-xl " style={{ backgroundColor: 'transparent' }} isOpen={modal} toggle={toggleModal}>
                                    <ModalBody style={{ backgroundColor: 'black' }}>
                                        <Card style={{ flex: 1,}}>
                                            <CardImg   width="100%" src={modalpicture} alt={modaltitle} />
                                        </Card>
                                    </ModalBody>
                                    <ModalFooter>
                                        <div style={{fontSize:'1.2rem', textTransform:'capitalize',textAlign:'justify'}}>{modaltitle}</div >
                                    </ModalFooter>
                                </Modal>
                                
                                <Card style={{ flex: 1, marginBottom: '1rem' , border: '1px solid black',borderRadius: '20px!important'}} onClick={() => handlePassInfoShow(item)}>
                                

                           
                            <CardImg  width="100%" src={item.picture} alt={item.title} />
                                {/* <CardImg width="100%" src={process.env.PUBLIC_URL + item.image} alt={item.title} /> */}
                            
                        
                                    {/* <Img
                                        style={{ backgroundColor: 'black', width: '480', height: '320' }}
                                        sizes="(max-width: 600px) 480px,800px"
                                        placeholder={loadingImage}
                                        src={awards.default}
                                        error={errorImage}
                                        alt="REACT COOL IMG"
                                    /> */}
                                </Card>
                                <div style={{ fontSize: '0.9rem', letterSpacing: '0.2rem', marginBottom: '1rem',textTransform:'capitalize' }}>{item.title}</div>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </section>
    );
};

export default CardTemplate;
