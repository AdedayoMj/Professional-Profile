import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ListTemplate from '../components/listtemplate';
import LoadingComponent from '../components/loading_components';
import PageHeader from '../components/pageheader';
import config from '../config/config';
import IArticle from '../interfaces/article';
import { Container } from 'reactstrap';
import ErrorText from '../components/errortext';

export interface IErrorProps {}

const ArticlePage: React.FunctionComponent<IErrorProps & RouteComponentProps<any>> = (props) => {
    const [article, setArticle] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllArticles();
    }, []);

    const getAllArticles = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/article`
            });

            if (response.status === (200 || 304)) {
                let article = response.data.article as IArticle[];
                // article.sort((x, y) => y.year.localeCompare(x.year));

                setArticle(article);
            } else {
                setError('Unable to retrieve article information');
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
        return <LoadingComponent>Loading Article...</LoadingComponent>;
    }

    return (
        <PageHeader title="Articles">
            <ErrorText error={error} />
            <ListTemplate sectionTitle="Journal Articles" articleArray={article} />

            <Container style={{ background: 'whitesmoke' }}>
                <div>
                    {' '}
                    <h5>More</h5>
                </div>
            </Container>
            <Container>
                <div>
                    For more article authored by Dr Oyelola Adegboye from 2010 onwards. Click here:
                    <a style={{ color: 'blue' }} rel="noopener noreferrer" target="_blank" href="https://scholar.google.com.au/citations?user=cBBMefsAAAAJ&hl=en&oi=ao">
                        more research outputs
                    </a>{' '}
                </div>
            </Container>
        </PageHeader>
    );
};

export default ArticlePage;
