import React, { useEffect, useState } from 'react';
import CurrentTemplate from '../components/current_project_template';
import ICurrent from '../interfaces/current';
import PageHeader from '../components/pageheader';
import axios from 'axios';
import config from '../config/config';
import LoadingComponent from '../components/loading_components';
import ErrorText from '../components/errortext';

export interface IErrorProps {}
const CurrentProjectPage: React.FunctionComponent<IErrorProps> = (props) => {
    const [current, setCurrent] = useState<ICurrent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllArticles();
    }, []);

    const getAllArticles = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/current`
            });

            if (response.status === (200 || 304)) {
                let current = response.data.current as ICurrent[];
                // article.sort((x, y) => y.year.localeCompare(x.year));

                setCurrent(current);
            } else {
                setError('Unable to retrieve current project information');
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
        return <LoadingComponent>Loading Project...</LoadingComponent>;
    }

    // const currentProject = {};
    // "Genetic Selection for Health beneficial Long-chain omega-3s in Australian White lambs (PhD , Secondary Advisor)",
    // "Longitudinal Study on Allostatic Load Biomarkers and its Impact on Mental Illness/Health (PhD , Secondary Advisor)"

    return (
        <PageHeader title="Current Project">
            <ErrorText error={error} />
            <CurrentTemplate sectionTitle="Current" currentArray={current} />
        </PageHeader>
    );
};

export default CurrentProjectPage;
