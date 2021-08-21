import React, { useContext, useEffect, useState } from 'react';

import IPageProps from '../interfaces/pages';
import { Container } from 'reactstrap';

import PageHeader from '../components/pageheader';
import { RouteComponentProps } from 'react-router-dom';
import UserContext from '../context/user';
import IAbout from '../interfaces/about';
import axios from 'axios';
import config from '../config/config';
import LoadingComponent from '../components/loading_components';
import IUser from '../interfaces/user';
import AboutPreview from '../components/about_preview';
import ErrorText from '../components/errortext';

const AboutPage: React.FunctionComponent<IPageProps & RouteComponentProps<any>> = (props) => {
    const [about, setAbout] = useState<IAbout[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const { user } = useContext(UserContext).userState;

    useEffect(() => {
        getAllBlogs();
    }, []);

    const getAllBlogs = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/about`
            });

            if (response.status === (200 || 304)) {
                let about = response.data.about as IAbout[];
                about.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));

                setAbout(about);
            } else {
                setError('Unable to retrieve bio information');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    };

    if (loading) {
        return <LoadingComponent>Loading Bio...</LoadingComponent>;
    }

    return (
        <PageHeader title="About">
            <Container>
                <ErrorText error={error} />
                {about.map((bio, index) => {
                    return (
                        <div key={index}>
                            <AboutPreview
                                _id={bio._id}
                                author={(bio.author as IUser).name}
                                title={bio.title}
                                createdAt={bio.createdAt}
                                updatedAt={bio.updatedAt}
                                resume={bio.resume}
                                picture={bio.picture}
                                content={bio.content}
                                userid={user._id}
                                authorId={(bio.author as IUser)._id}
                            />
                        </div>
                    );
                })}
                <ErrorText error={error} />
            </Container>
        </PageHeader>
    );
};

export default AboutPage;
