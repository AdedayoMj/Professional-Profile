import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import config from '../../config/config';
import UserContext from '../../context/user';
import IHonours from '../../interfaces/honour';
import IUser from '../../interfaces/user';
import ErrorText from '../errortext';
import { Loading } from '../loading_components';

interface IHonourProps {
    urlUnique: string;
    editPage: string;
    sectionTitle: string;
    honourArray?: IHonours[];
}

const HonourTemplate: React.FunctionComponent<IHonourProps> = (props) => {
    const [deleting, setDeleting] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { honourArray, sectionTitle, children, editPage, urlUnique } = props;
    const { user } = useContext(UserContext).userState;
    const fire_token = localStorage.getItem('fire_token');

    const history = useHistory();

    const deleteBlog = async (_objectID: any) => {
        setDeleting(true);
        let awardID = _objectID;

        try {
            const response = await axios({
                method: 'DELETE',
                url: `${config.server.url}api/${urlUnique}/${awardID}`
            });

            if (response.status === 201) {
                setTimeout(() => {
                    history.push('/');
                }, 1000);
            } else {
                setError(`Unable to retrieve blog ${_objectID}`);
                setDeleting(false);
            }
        } catch (error) {
            setError(error.message);
            setDeleting(false);
        }
    };
    return (
        <section style={{ marginBottom: '3rem' }}>
            <ErrorText error={error} />
            <Container style={{ background: 'whitesmoke' }}>
                <Row style={{ justifyContent: 'space-between', marginLeft: '0.4rem', marginRight: '0.4rem' }}>
                    <h5>{sectionTitle}</h5>
                    <span >
                        {' '}
                        {fire_token != null ? (
                            <Button color="info" className="mr-2" tag={Link} to={`/${editPage}`}>
                                <i className="fas fa-plus mr-2"></i>Add
                            </Button>
                        ) : (
                            ''
                        )}
                    </span>
                </Row>
            </Container>
            <hr />

            {honourArray?.map(function (item, index) {
                return (
                    <ul key={index}>
                        <Modal isOpen={modal}>
                            <ModalHeader>Delete</ModalHeader>
                            <ModalBody>
                                {deleting ? <Loading /> : 'Are you sure you want to delete this item?'}
                                <ErrorText error={error} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => deleteBlog(item._id)}>
                                    Delete Permanently
                                </Button>
                                <Button color="secondary" onClick={() => setModal(false)}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                        <li>
                            {item.year} - {item.title}
                            {user._id === (item.author as IUser)._id && (
                                <Container fluid className="p-0">
                                    <Button color="info" className="mr-2" tag={Link} to={`/${editPage}/${item._id}`}>
                                        <i className="fas fa-edit mr-2"></i>Edit
                                    </Button>
                                    <Button onClick={() => setModal(true)} color="danger">
                                        <i className="far fa-trash-alt mr-2"></i>Delete
                                    </Button>
                                    <hr color="white" />
                                </Container>
                            )}
                            {/* to={(item.author as IUser)._id == user._id ? `/articleEdit/${item._id}` : ''} */}
                        </li>
                    </ul>
                );
            })}
            {children}
        </section>
    );
};

export default HonourTemplate;
