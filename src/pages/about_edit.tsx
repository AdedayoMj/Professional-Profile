import React, { useContext, useEffect, useState } from 'react';
import IPageProps from '../interfaces/pages';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import UserContext from '../context/user';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';
import logging from '../config/loggin';
import htmlToDraft from 'html-to-draftjs';
import IAbout from '../interfaces/about';
import LoadingComponent from '../components/loading_components';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ErrorText from '../components/errortext';
import Header from '../components/header';
import SuccessText from '../components/successtext';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AboutEditPage: React.FunctionComponent<IPageProps & RouteComponentProps<any>> = (props) => {
    const [_id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [picture, setPicture] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    const [saving, setSaving] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { user } = useContext(UserContext).userState;
    useEffect(() => {
        let aboutID = props.match.params.aboutID;

        if (aboutID) {
            setId(aboutID);
            getAbout(aboutID);
        } else {
            setLoading(false);
        }

        // eslint-disable-next-line
    }, []);
    const getAbout = async (id: string) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/about/read/${id}`
            });

            if (response.status === (200 || 304)) {
                if (user._id !== response.data.about.author._id) {
                    logging.warn(`This Bio is owned by someone else.`);
                    setId('');
                } else {
                    let about = response.data.about as IAbout;
                    setTitle(about.title);
                    setContent(about.content);
                    setPicture(about.picture || '');

                    /** Convert html string to draft JS */
                    const contentBlock = htmlToDraft(about.content);
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    setEditorState(editorState);
                }
            } else {
                setError(`Unable to retrieve About ${_id}`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createAbout = async () => {
        if (title === '' || content === '') {
            setError('Please fill out all fields.');
            setSuccess('');
            return null;
        }

        setError('');
        setSuccess('');
        setSaving(true);

        try {
            let resume = 'unknown';
            const response = await axios({
                method: 'POST',
                url: `${config.server.url}api/about/create`,
                data: {
                    title,
                    picture,
                    content,
                    resume,
                    author: user._id
                }
            });

            if (response.status === 201) {
                setId(response.data.about._id);
                setSuccess('Bio posted.  You can continue to edit on this page.');
            } else {
                setError(`Unable to save Bio.`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const editAbout = async () => {
        if (title === '' || content === '') {
            setError('Please fill out all fields.');
            setSuccess('');
            return null;
        }

        setError('');
        setSuccess('');
        setSaving(true);

        try {
            let resume = 'unknown';
            const response = await axios({
                method: 'PATCH',
                url: `${config.server.url}api/about/update/${_id}`,
                data: {
                    title,
                    picture,
                    content,
                    resume
                }
            });

            if (response.status === 201) {
                setSuccess('Bio updated.');
            } else {
                setError(`Unable to save Bio information.`);
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
            <Header image={process.env.PUBLIC_URL + 'bio.jpg'} title={_id !== '' ? 'Edit Your bio information' : 'Create your bio information'} name="" />
            <Container className="mt-5 mb-5">
                <ErrorText error={error} />
                <Form>
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
                        <Label for="picture">Picture URL</Label>
                        <Input
                            type="text"
                            name="picture"
                            value={picture}
                            id="picture"
                            placeholder="Picture URL"
                            disabled={saving}
                            onChange={(event) => {
                                setPicture(event.target.value);
                            }}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Paragragh 1</Label>
                        <Editor
                            editorState={editorState}
                            wrapperClassName="card"
                            editorClassName="card-body"
                            onEditorStateChange={(newState) => {
                                setEditorState(newState);
                                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
                            }}
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'embedded', 'emoji', 'image'],
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true }
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
                                    editAbout();
                                } else {
                                    createAbout();
                                }
                            }}
                            disabled={saving}
                        >
                            <i className="fas fa-save mr-1"></i>
                            {_id !== '' ? 'Update' : 'Post'}
                        </Button>
                        {_id !== '' && (
                            <Button block color="success" tag={Link} to={`/about`}>
                                Go to your Bio post!
                            </Button>
                        )}
                    </FormGroup>
                    {/* <FormGroup>
                        <Label >Preview</Label>
                        <div className="border ql-container p-2" style={{ backgroundColor: 'white' }}>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content
                                }}
                            />
                        </div>
                    </FormGroup> */}
                </Form>
                <ErrorText error={error} />
            </Container>
        </Container>
    );
};
export default withRouter(AboutEditPage);
