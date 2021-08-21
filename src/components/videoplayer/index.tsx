import * as React from 'react';
import Vimeo from '@u-wave/react-vimeo';

export interface IVideoPlayerProps {
    logo: string;
    video: string;
}

const VideoPlayer: React.FunctionComponent<IVideoPlayerProps> = (props) => {
    // const { logo, video } = props;

    const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
        e.currentTarget.play();
    };
    const handleOnMouseOverOut = (e: React.MouseEvent<HTMLVideoElement>) => {
        e.currentTarget.pause();
    };
    let videoIndex = 0;
    const videos = [
        { id: 162959050, name: 'Jambinai - They Keep Silence' },
        { id: 169408731, name: 'Hoody - Like You' }
    ];
    const videod = videos[videoIndex];
    return (
        <div>
            {/* <img src={logo} alt="logo" /> */}
            <Vimeo
                video={videod.id}
                width={640}
                height={480}
                autoplay
                // volume={volume}
                // paused={paused}
                // onPause={this.handlePlayerPause}
                // onPlay={this.handlePlayerPlay}
            />
            {/* <video style={{ width: '20rem' }} loop preload="none" onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOverOut}>
                <source src={video} type="video/mp4" />
            </video> */}
        </div>
    );
};

export default VideoPlayer;
