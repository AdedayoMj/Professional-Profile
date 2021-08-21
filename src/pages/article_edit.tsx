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
import IArticle from '../interfaces/article';

const ArticleEditPage: React.FunctionComponent<IPageProps & RouteComponentProps<any>> = (props) => {
    const [_id, setId] = useState<string>('');
    const [writer, setWriter] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [otherInfo, setOtherInfo] = useState<string>('');

    const [saving, setSaving] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { user } = useContext(UserContext).userState;
    useEffect(() => {
        let articleID = props.match.params.articleID;

        if (articleID) {
            setId(articleID);
            getArticle(articleID);
        } else {
            setLoading(false);
        }

        // eslint-disable-next-line
    }, []);
    const getArticle = async (id: string) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/article/read/${id}`
            });

            if (response.status === (200 || 304)) {
                if (user._id !== response.data.article.author._id) {
                    logging.warn(`This Article is owned by someone else.`);
                    setId('');
                } else {
                    let article = response.data.article as IArticle;
                    setTitle(article.title);
                    setWriter(article.writer);
                    setUrl(article.url || '');
                    setOtherInfo(article.otherInfo || '');
                    setYear(article.year || '');
                }
            } else {
                setError(`Unable to retrieve Article ${_id}`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createArticle = async () => {
        if (title === '' || writer === '') {
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
                url: `${config.server.url}api/article/create`,
                data: {
                    title,
                    writer,
                    url,
                    otherInfo,
                    year,
                    author: user._id
                }
            });

            if (response.status === 201) {
                setId(response.data.article._id);
                setSuccess('Article posted.  You can continue to edit on this page.');
            } else {
                setError(`Unable to save Article.`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const editArticle = async () => {
        if (title === '' || writer === '') {
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
                url: `${config.server.url}api/article/update/${_id}`,
                data: {
                    title,
                    writer,
                    url,
                    otherInfo,
                    year
                }
            });

            if (response.status === 201) {
                setSuccess('Article updated.');
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
                image="https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
                title={_id !== '' ? 'Edit your articles' : 'Add more article '}
                name=""
            />
            <Container className="mt-5 mb-5">
                <ErrorText error={error} />
                <Form>
                    <FormGroup>
                        <Label for="writer">Author(s)</Label>
                        <Input
                            type="text"
                            name="writer"
                            value={writer}
                            id="writer"
                            placeholder="Author(s)"
                            disabled={saving}
                            onChange={(event) => {
                                setWriter(event.target.value);
                            }}
                        />
                    </FormGroup>
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
                        <Label for="otherInfo">Other Information</Label>
                        <Input
                            type="text"
                            name="otherInfo"
                            value={otherInfo}
                            id="otherInfo"
                            placeholder="Other Information"
                            disabled={saving}
                            onChange={(event) => {
                                setOtherInfo(event.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="url">Web hyperlink</Label>
                        <Input
                            type="text"
                            name="url"
                            value={url}
                            id="url"
                            placeholder="Web hyperlink"
                            disabled={saving}
                            onChange={(event) => {
                                setUrl(event.target.value);
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
                                    editArticle();
                                } else {
                                    createArticle();
                                }
                            }}
                            disabled={saving}
                        >
                            <i className="fas fa-save mr-1"></i>
                            {_id !== '' ? 'Update' : 'Post'}
                        </Button>
                        {_id !== '' && (
                            <Button block color="success" tag={Link} to={`/article`}>
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
export default withRouter(ArticleEditPage);
