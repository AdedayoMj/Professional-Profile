import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import config from '../../config/config';
import UserContext from '../../context/user';
import IArticle from '../../interfaces/article';
import IUser from '../../interfaces/user';
import ErrorText from '../errortext';
import { Loading } from '../loading_components';

interface IHonourProps {
    sectionTitle: string;
    articleArray?: IArticle[];
}

const ListTemplate: React.FunctionComponent<IHonourProps> = (props) => {
    const [deleting, setDeleting] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const { articleArray, sectionTitle, children } = props;
    const { user } = useContext(UserContext).userState;
    const fire_token = localStorage.getItem('fire_token');

    const history = useHistory();

    const deleteBlog = async (_objectID: any) => {
        setDeleting(true);
        let articleID = _objectID;
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${config.server.url}api/article/${articleID}`
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
            <Container style={{ background: 'whitesmoke' }}>
                <Row style={{ justifyContent: 'space-between', marginLeft: '0.4rem', marginRight: '0.4rem' }}>
                    <h5>{sectionTitle}</h5>
                    <span>
                        {' '}
                        {fire_token != null ? (
                            <Button color="info" className="mr-2" tag={Link} to={`/articleEdit`}>
                                <i className="fas fa-plus mr-2"></i>Add
                            </Button>
                        ) : (
                            ''
                        )}
                    </span>
                </Row>
            </Container>
            <hr />
            {articleArray?.map(function (item, index) {
                return (
                    <ul key={index}>
                        <Modal isOpen={modal}>
                            <ModalHeader>Delete</ModalHeader>
                            <ModalBody>
                                {deleting ? <Loading /> : 'Are you sure you want to delete this blog?'}
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
                            {item.writer}({item.year}).{' '}
                            <a rel="noopener noreferrer" target="_blank" href={item.url}>
                                {item.title}
                            </a>
                            . {item.otherInfo}
                            {user._id === (item.author as IUser)._id && (
                                <Container fluid className="p-0">
                                    <Button color="info" className="mr-2" tag={Link} to={`/articleEdit/${item._id}`}>
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

export default ListTemplate;
