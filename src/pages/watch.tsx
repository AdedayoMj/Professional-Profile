import React, { useEffect, useState } from 'react';
import IPageProps from '../interfaces/pages';

import { ReactVideoPlay, VideoSourceType } from 'react-video-play';
import { Container } from 'reactstrap';
import PageHeader from '../components/pageheader';
import LoadingComponent from '../components/loading_components';

const WatchPage: React.FunctionComponent<IPageProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);

    }, []);
    let src1 = [
        {
            name: 'CHANNEL 7NEWS',
            source: [
                {
                    source: process.env.PUBLIC_URL + '7news.mp4',
                    type: VideoSourceType.video_mp4
                }
            ]
        }
    ];
    let src2 = [
        {
            name: 'CHANNEL WIN NEWS',
            source: [
                {
                    source: process.env.PUBLIC_URL + 'WIN_news.mp4',
                    type: VideoSourceType.video_mp4
                }
            ]
        }
    ];

    if (loading) {
        return <LoadingComponent>Loading Videos...</LoadingComponent>;
    }
    return (
        <PageHeader title="Media Outreach">
            <ReactVideoPlay
                sources={src2}
                autoplay={false}
                muted={false}
                controls={true}
            />
            <hr />
            <ReactVideoPlay
                sources={src1}
                autoplay={false}
                muted={false}
                controls={true}
            />
            
            
        </PageHeader>
    );
};

export default WatchPage;
