import PlayerContext from '@/context/PlayerCtx';
import React, { useContext } from 'react'
import ReactPlayer from 'react-player'
import { OnProgressProps } from 'react-player/base';

interface Props {
    playerRef: React.RefObject<ReactPlayer>;
    url: string;
}
function Player({ playerRef, url }: Props) {
    const { setVidDuration, setVidProgress } = useContext(PlayerContext);
    function handleVidProgress(state: OnProgressProps): void {
        console.log(state.playedSeconds)
        setVidProgress(state.playedSeconds)
    }

    function handleDuration(duration: number): void {
        //todo use this to set max time
        console.log("duration: ", duration)
        setVidDuration(duration)
    }
    return (
        <div className="relative pt-[56.25%]">
            <ReactPlayer
                ref={playerRef}
                className="absolute top-0 left-0"
                url={url}
                width='100%'
                height='100%'
                controls
                onDuration={handleDuration}
                onProgress={handleVidProgress} />
        </div>
    )
}

export default Player