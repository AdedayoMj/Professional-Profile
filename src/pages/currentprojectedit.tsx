import React, { useContext, useEffect, useState } from 'react';
import IPageProps from '../interfaces/pages';
import UserContext from '../context/user';
import { Link, RouteComponentProps, withRouter, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import logging from '../config/loggin';

import LoadingComponent from '../components/loading_components';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ErrorText from '../components/errortext';
import Header from '../components/header';
import SuccessText from '../components/successtext';
import ICurrent from '../interfaces/current';

const CurrentEditPage: React.FunctionComponent<IPageProps & RouteComponentProps<any>> = (props) => {
    const [_id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [attribute, setAttribute] = useState<string>('');
    const [saving, setSaving] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { user } = useContext(UserContext).userState;
    // const {objectID, url}= useParams();

    useEffect(() => {
        let objectID = props.match.params.currentID;

        if (objectID) {
            setId(objectID);
            getCurrentProject(objectID);
        } else {
            setLoading(false);
        }

        // eslint-disable-next-line
    }, []);

    const getCurrentProject = async (id: string) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/current/read/${id}`
            });

            if (response.status === (200 || 304)) {
                if (user._id !== response.data.current.author._id) {
                    logging.warn(`This award is owned by someone else.`);
                    setId('');
                } else {
                    let obj = response.data.current as ICurrent;
                    setTitle(obj.title);
                    setAttribute(obj.attribute);
                }
            } else {
                setError(`Unable to retrieve project ${_id}`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createCurrentProject = async () => {
        if (title === '' || attribute === '') {
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
                url: `${config.server.url}api/current/create`,
                data: {
                    title,
                    attribute,
                    author: user._id
                }
            });

            if (response.status === 201) {
                setId(response.data.current._id);
                setSuccess('Project posted.  You can continue to edit on this page.');
            } else {
                setError(`Unable to save Project.`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const editCurrentProject = async () => {
        if (title === '' || attribute === '') {
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
                url: `${config.server.url}api/current/update/${_id}`,
                data: {
                    title,
                    attribute
                }
            });

            if (response.status === 201) {
                setSuccess('Project updated.');
            } else {
                setError(`Unable to save project information.`);
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
                image="https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                title={_id !== '' ? `Edit your curent project` : `Add current project`}
                name=""
            />
            <Container className="mt-5 mb-5">
                <ErrorText error={error} />
                <Form>
                    <FormGroup>
                        <Label for="attribute">Relationship</Label>
                        <Input
                            type="text"
                            name="attribute"
                            value={attribute}
                            id="attribute"
                            placeholder="Relationship"
                            disabled={saving}
                            onChange={(event) => {
                                setAttribute(event.target.value);
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
                                    editCurrentProject();
                                } else {
                                    createCurrentProject();
                                }
                            }}
                            disabled={saving}
                        >
                            <i className="fas fa-save mr-1"></i>
                            {_id !== '' ? 'Update' : 'Post'}
                        </Button>
                        {_id !== '' && (
                            <Button block color="success" tag={Link} to={`/current`}>
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
export default withRouter(CurrentEditPage);
