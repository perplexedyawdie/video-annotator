import NavBar from '@/components/NavBar'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'
import dynamic from "next/dynamic";
import { OnProgressProps } from 'react-player/base';
import PlayerContext from '@/context/PlayerCtx';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
const Editor = dynamic(() => import("@/components/NoteTaker"), { ssr: false });
const Scrubber = dynamic(() => import("@/components/VibScrubber"), { ssr: false });
const Player = dynamic(() => import("@/components/Player"), { ssr: false });
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export interface NoteDetails {
    editorId: string;
    timeStamp: number;
    timeDisplay: string;
    noteData: string;
}

interface VNote {
    id: string;
    url: string;
    noteDetails: NoteDetails;
}

function Annotator({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const playerRef = useRef<ReactPlayer>(null);
    const [vidDuration, setVidDuration] = useState<number>(0);
    const [vidProgress, setVidProgress] = useState<number>(0);
    const [notes, setNotes] = useState<NoteDetails[]>([]);
    const [vnote, setVnote] = useState<VNote | null>(null);


    function handleAddNote(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const date = new Date(0);
        date.setSeconds(vidProgress); // specify value for SECONDS here
        const timeDisplay = date.toISOString().substring(11, 19);
        setNotes(prev => [...prev, {
            editorId: uuidv4(),
            timeStamp: vidProgress,
            timeDisplay,
            noteData: ""
        }])
    }

    return (
        <PlayerContext.Provider value={{
            vidDuration,
            vidProgress,
            playerRef,
            setNotes,
            setVidDuration,
            setVidProgress
        }}>
            <NavBar />
            <div className="py-6 mx-auto max-w-screen-2xl px-4 space-y-24">
                <div className="flex flex-col w-full space-y-4">
                    {
                        ReactPlayer.canPlay(router.asPath) ? (
                            <Player playerRef={playerRef} url={router.asPath} />
                        ) : null
                    }
                    <Scrubber />
                    {/* <NoteBtns /> */}
                    <div className="flex w-full justify-center items-center space-x-4">
                        <button onClick={handleAddNote} className="btn btn-outline btn-primary">Add Note</button>
                        <button onClick={handleAddNote} className="btn btn-outline btn-secondary">Save Notes</button>
                    </div>
                    <div className="w-full rounded-lg bg-gray-200 py-4 px-2 flex flex-col space-y-4">
                    {
                        notes.map((note) => <Editor key={note.editorId} editorId={note.editorId} timeStamp={note.timeStamp} timeDisplay={note.timeDisplay} />)
                    }
                    </div>
                </div>

            </div>
        </PlayerContext.Provider>
    )
}
export const getServerSideProps = (async (context) => {
    try {
      
      console.log("url:", context.resolvedUrl)
      console.log(uuidValidate(context.resolvedUrl))
      return {
        props: {}
      }
    } catch (error) {
      console.error(error)
      //todo redirect to homepage
      return {
        redirect: {
          destination: "/",
          permanent: false
        }
      }
    }
  
  }) satisfies GetServerSideProps

export default Annotator