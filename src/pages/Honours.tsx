import React, { useEffect, useState } from 'react';
import IHonours from '../interfaces/honour';
import IPageProps from '../interfaces/pages';
import PageHeader from '../components/pageheader';
import axios from 'axios';
import config from '../config/config';
import HonourTemplate from '../components/honours_template';
import LoadingComponent from '../components/loading_components';

const HonoursPage: React.FunctionComponent<IPageProps> = (props) => {
    const [awards, setAward] = useState<IHonours[]>([]);
    const [fellowship, setFellowship] = useState<IHonours[]>([]);
    const [member, setMember] = useState<IHonours[]>([]);
    const [others, setOthers] = useState<IHonours[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        getAllAwards();
        getAllFellowship();
        getAllOtherHonours();
        getAllmembers();
    }, []);

    const getAllAwards = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/award`
            });
            if (response.status === (200 || 304)) {
                let award = response.data.award as IHonours[];
                // article.sort((x, y) => y.year.localeCompare(x.year));
                setAward(award);
            } else {
                setError('Unable to retrieve award information');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    };
    const getAllFellowship = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/fellow`
            });
            if (response.status === (200 || 304)) {
                let fellow = response.data.fellow as IHonours[];
                // article.sort((x, y) => y.year.localeCompare(x.year));
                setFellowship(fellow);
            } else {
                setError('Unable to retrieve fellowship information');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    };
    const getAllmembers = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/member`
            });
            if (response.status === (200 || 304)) {
                let member = response.data.member as IHonours[];
                // article.sort((x, y) => y.year.localeCompare(x.year));
                setMember(member);
            } else {
                setError('Unable to retrieve mebership information');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    };
    const getAllOtherHonours = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.server.url}api/otherhonours`
            });
            if (response.status === (200 || 304)) {
                let other = response.data.other as IHonours[];
                // article.sort((x, y) => y.year.localeCompare(x.year));
                setOthers(other);
            } else {
                setError('Unable to retrieve Other honours information');
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
        return <LoadingComponent>Loading Honours...</LoadingComponent>;
    }

    return (
        <PageHeader title="Honours">
            <HonourTemplate urlUnique="award" editPage="editAward" sectionTitle="Awards" honourArray={awards} />
            <HonourTemplate urlUnique="fellow" editPage="editFellow" sectionTitle="Fellowships" honourArray={fellowship} />
            <HonourTemplate urlUnique="member" editPage="editMember" sectionTitle="Memberships" honourArray={member} />
            <HonourTemplate urlUnique="otherhonours" editPage="editOtherHonour" sectionTitle="Other" honourArray={others} />
        </PageHeader>
    );
};

export default HonoursPage;
