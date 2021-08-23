import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/user';
// import ModalPopUp from '../modal';
import {
    Collapse,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarText,
    Container,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';

export interface INavigationProps {}

const Naviagtion: React.FunctionComponent<INavigationProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modal, setModal] = useState(false);

    const userContext = useContext(UserContext);
    const { user } = userContext.userState;

    const toggle = () => setIsOpen(!isOpen);
    const navStyle = {
        backgroundColor: 'black',
        opacity: 0.9,
        marginLeft: '7%',
        marginRight: '7%'
    };

    const toggleModal = () => setModal(!modal);
    const Logout = () => {
        userContext.userDispatch({ type: 'logout', payload: userContext.userState });
        toggleModal();
    };
    const separatorLine = !isOpen ? (
        <NavbarText className="ml-2 mr-2" style={{ color: 'white' }}>
            |
        </NavbarText>
    ) : (
        ''
    );

    return (
        <Navbar fixed="top" style={navStyle} light expand="md">
            <Container>
                <Modal isOpen={modal}>
                    <ModalHeader>Delete</ModalHeader>
                    <ModalBody>
                        {/* {deleting ?
                                <Loading />
                            : */}
                        "Are you sure you want to signout?"
                        {/* } */}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => Logout()}>
                            Logout
                        </Button>
                        <Button color="secondary" onClick={() => setModal(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <NavbarToggler onClick={toggle} style={{ backgroundColor: 'white' }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {separatorLine}
                        <NavItem>
                            <NavLink tag={Link} to="/" style={{ color: 'white' }}>
                                Home
                            </NavLink>
                        </NavItem>
                        {separatorLine}
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle style={{ color: 'white' }} nav caret>
                                Publications
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={Link} to="/article">
                                    Article
                                </DropdownItem>
                                <DropdownItem tag={Link} to="/current">
                                    Current Projects
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {separatorLine}
                        <NavItem>
                            <NavLink tag={Link} to="/honours" style={{ color: 'white' }}>
                                Honours
                            </NavLink>
                        </NavItem>
                        {separatorLine}
                        <NavItem>
                            <NavLink tag={Link} to="/sight" style={{ color: 'white' }}>
                                Sights & Sounds
                            </NavLink>
                        </NavItem>
                        {separatorLine}
                        <NavItem>
                            <NavLink tag={Link} to="/about" style={{ color: 'white' }}>
                                About
                            </NavLink>
                        </NavItem>
                        {separatorLine}
                        {user._id !== '' ? (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle style={{ color: 'white' }} nav caret>
                                    Admin
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem tag={Link} to="/admin/change">
                                        Password Change
                                    </DropdownItem>
                                    <DropdownItem tag={Link} to="/admin/register">
                                        Signup
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem style={{ color: 'red' }} onClick={() => setModal(true)}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        ) : (
                            ' '
                        )}
                    </Nav>
                    <NavbarText>
                        <NavLink style={{ color: 'blue' }} href="https://www.linkedin.com/in/oyelola-adegboye-phd-cstat-csci-fimc-cmc-15495423/" rel="noopener noreferrer" target="_blank">
                            <i className="fab fa-linkedin-in"></i>
                        </NavLink>
                    </NavbarText>
                    {separatorLine}
                    <NavbarText style={{ color: 'blue' }}>
                        <NavLink style={{ color: 'blue' }} href="https://www.facebook.com/prince.oyelola.3" rel="noopener noreferrer" target="_blank">
                            <i className="fab fa-facebook-f"></i>
                        </NavLink>
                    </NavbarText>

                    {/* <NavbarText className="ml-2 mr-2"></NavbarText> */}
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default Naviagtion;
