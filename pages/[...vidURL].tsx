import NavBar from '@/components/NavBar'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import dynamic from "next/dynamic";
import { OnProgressProps } from 'react-player/base';
import PlayerContext from '@/context/PlayerCtx';
 
const Editor = dynamic(() => import("@/components/NoteTaker"), { ssr: false });
const Scrubber = dynamic(() => import("@/components/VibScrubber"), { ssr: false });

function Annotator() {
    const router = useRouter();
    const playerRef = useRef<ReactPlayer>(null)
    const [vidDuration, setVidDuration] = useState<number>(0)
    const [vidProgress, setVidProgress] = useState<number>(0)
    console.log(router.asPath)
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
        <PlayerContext.Provider value={{
            vidDuration,
            vidProgress,
            playerRef
        }}>
            <NavBar />
            <div className="py-6 mx-auto max-w-screen-2xl px-4 space-y-24">
                <div className="flex flex-col w-full space-y-4">
                    {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                        <input type="text" placeholder="Youtube URL here" className="input input-bordered w-full max-w-xs" />
                        <button className="btn btn-primary">Load</button>
                    </div> */}
                    <p>Post: {router.asPath}</p>
                    {
                        ReactPlayer.canPlay(router.asPath) ? (
                            <div className="relative pt-[56.25%]">
                                <ReactPlayer
                                    ref={playerRef}
                                    className="absolute top-0 left-0"
                                    url={router.asPath}
                                    width='100%'
                                    height='100%'
                                    controls
                                    onDuration={handleDuration}
                                    onProgress={handleVidProgress} />
                            </div>
                        ) : null
                    }
                    <Scrubber />
                    <Editor />
                </div>
                
            </div>
        </PlayerContext.Provider>
    )
}

export default Annotator