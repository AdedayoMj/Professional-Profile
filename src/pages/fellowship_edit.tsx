import React, { useContext, useEffect, useState } from 'react';
import IPageProps from '../interfaces/pages';
import UserContext from '../context/user';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import logging from '../config/loggin';

import LoadingComponent from '../components/loading_components';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ErrorText from '../components/errortext';
import Header from '../components/header';
import SuccessText from '../components/successtext';
import IHonours from '../interfaces/honour';

const FellowshipEditPage: React.FunctionComponent<IPageProps & RouteComponentProps<any>> = (props) => {
    const [_id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [saving, setSaving] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { user } = useContext(UserContext).userState;
    // const {objectID, url}= useParams();

    useEffect(() => {
        let objectID = props.match.params.awardID;

        if (objectID) {
            setId(objectID);
            getHonour(objectID);
        } else {
            setLoading(false);
        }

        // eslint-disable-next-line
    }, []);

    const getHonour = async (id: string) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/fellow/read/${id}`
            });

            if (response.status === (200 || 304)) {
                if (user._id !== response.data.fellow.author._id) {
                    logging.warn(`This fellowship is owned by someone else.`);
                    setId('');
                } else {
                    let obj = response.data.fellow as IHonours;
                    setTitle(obj.title);
                    setYear(obj.year || '');
                }
            } else {
                setError(`Unable to retrieve fellowship ${_id}`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createHonours = async () => {
        if (title === '' || year === '') {
            setError('Please fill out all fields.');
            setSuccess('');
            return null;
        }

        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const response = await axios({
                method: 'POST',
                url: `${config.server.url}api/fellow/create`,
                data: {
                    title,
                    year,
                    author: user._id
                }
            });

            if (response.status === 201) {
                setId(response.data.fellow._id);
                setSuccess('Fellowship posted.  You can continue to edit on this page.');
            } else {
                setError(`Unable to save Honour.`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const editHonours = async () => {
        if (title === '' || year === '') {
            setError('Please fill out all fields.');
            setSuccess('');
            return null;
        }

        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const response = await axios({
                method: 'PATCH',
                url: `${config.server.url}api/fellow/update/${_id}`,
                data: {
                    title,
                    year
                }
            });

            if (response.status === 201) {
                setSuccess('Fellowship updated.');
            } else {
                setError(`Unable to save article information.`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };
    if (loading) return <LoadingComponent />;

    return (
        <Container fluid className="p-0">
            <Header
                image="https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
                title={_id !== '' ? `Edit your fellowship` : `Add more fellowship`}
                name=""
            />
            <Container className="mt-5 mb-5">
                <ErrorText error={error} />
                <Form>
                    <FormGroup>
                        <Label for="year">Year</Label>
                        <Input
                            type="text"
                            name="year"
                            value={year}
                            id="year"
                            placeholder="Year"
                            disabled={saving}
                            onChange={(event) => {
                                setYear(event.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            value={title}
                            id="title"
                            placeholder="Enter a title"
                            disabled={saving}
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <SuccessText success={success} />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            style={{ backgroundColor: '#222454' }}
                            block
                            onClick={() => {
                                if (_id !== '') {
                                    editHonours();
                                } else {
                                    createHonours();
                                }
                            }}
                            disabled={saving}
                        >
                            <i className="fas fa-save mr-1"></i>
                            {_id !== '' ? 'Update' : 'Post'}
                        </Button>
                        {_id !== '' && (
                            <Button block color="success" tag={Link} to={`/honours`}>
                                Go to article post!
                            </Button>
                        )}
                    </FormGroup>
                </Form>
                <ErrorText error={error} />
            </Container>
        </Container>
    );
};
export default withRouter(FellowshipEditPage);
