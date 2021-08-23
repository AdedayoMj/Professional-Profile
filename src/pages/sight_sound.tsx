import React from 'react';
import IPageProps from '../interfaces/pages';
import PageHeader from '../components/pageheader';
// import axios from 'axios';
// import config from '../config/config';
// import LoadingComponent from '../components/loading_components';
// import ISight from '../interfaces/sight';
import CardTemplate from '../components/card_template';
// import ErrorText from '../components/errortext';

import * as singap1 from '../assets/sights/singapore2.png';
import * as singap2 from '../assets/sights/singapore3.png';
import * as singap3 from '../assets/sights/singapore1.png';
import * as malay from '../assets/sights/malaysia.png';
import * as moroc from '../assets/sights/morocco.png';
import * as sydney from '../assets/sights/sydney.png';
import * as taj from '../assets/sights/taj.png';
import * as eiffel from '../assets/sights/eiffel.png';

const SightSoundPage: React.FunctionComponent<IPageProps> = (props) => {
    // const [sightpictures, setSightsPictures] = useState<ISight[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string>('');

    const sightsArrayPicture = [
        {
            title: 'sight of singapore',
            picture: singap1.default,
            
        },
        {
            title: 'sight of singapore',
            picture: singap2.default,
         
        },
        {
            title: 'sight of singapore',
            picture: singap3.default,
          
        },
        {
            title: 'malaysia',
            picture: malay.default,
            
        },
        {
            title: 'morroco',
            picture: moroc.default,
         
        },
        {
            title: 'harbour of sydney',
            picture: sydney.default,
        },
        {
            title: 'taj mahal',
            picture: taj.default,
        },
        {
            title: 'eiffel tower',
            picture: eiffel.default,
        }
    ];
    // useEffect(() => {
    //     getAllSightsSound();

    // }, []);

    // const getAllSightsSound = async () => {
    //     try {
    //         const response = await axios({
    //             method: 'GET',
    //             url: `${config.server.url}api/sighsound`
    //         });
    //         if (response.status === (200 || 304)) {
    //             let sight = response.data.sight as ISight[];
    //             // article.sort((x, y) => y.year.localeCompare(x.year));
    //             setSightsPictures(sight);
    //         } else {
    //             setError('Unable to retrieve picture information');
    //         }
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setTimeout(() => {
    //             setLoading(false);
    //         }, 200);
    //     }
    // };
    // console.log(sightpictures);
   
    // if (loading) {
    //     return <LoadingComponent>Loading Pictures...</LoadingComponent>;
    // }

    return (
        <PageHeader title="Sights">
            {/* <ErrorText error={error} /> */}
            <CardTemplate sightsArray={sightsArrayPicture}/>
            
        </PageHeader>
    );
};

export default SightSoundPage;
