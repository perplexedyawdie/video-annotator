import NavBar from '@/components/NavBar'
import React, { useRef, useState, useEffect } from 'react'
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
import { getAllBlobData, getNoteData, saveNote } from '@/utils/netlify-blobs';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export interface NoteDetails {
    editorId: string;
    timeStamp: number;
    timeDisplay: string;
    noteData: string;
}

export interface VNote {
    id: string;
    url: string;
    noteDetails?: NoteDetails[];
}

function Annotator({ myNote }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const playerRef = useRef<ReactPlayer>(null);
    const [vidDuration, setVidDuration] = useState<number>(0);
    const [vidProgress, setVidProgress] = useState<number>(0);
    const [notes, setNotes] = useState<NoteDetails[]>(myNote?.noteDetails ?? []);
    const [isSaving, setIsSaving] = useState<boolean>(false)
    // const [vnote, setVnote] = useState<VNote | null>(myNote ?? null);
    
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

    async function handleSaveNote(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        try {
            setIsSaving(true)
            const newNote: VNote = {
                ...myNote,
                noteDetails: notes
            }
            const saveResult = await axios.post("/api/save-notes", {
                noteData: {
                    ...newNote
                }
            });
            if (saveResult.data.result) {
                toast.success('Notes saved successfuly! :)')
            } else {
                throw new Error("Note not saved :(");
                
            }
        } catch (error) {
            console.error(error)
            toast.error("Notes not saved! Try again later. :(")
        } finally {
            setIsSaving(false)
        }

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
            <Toaster/>
            <NavBar />
            <div className="py-6 mx-auto max-w-screen-2xl px-4 space-y-24">
                <div className="flex flex-col w-full space-y-4">
                    {
                        ReactPlayer.canPlay(myNote?.url ?? "") ? (
                            <Player playerRef={playerRef} url={myNote?.url ?? ""} />
                        ) : <p className="text-6xl">Sorry! Can&apos;t play that file 😢</p>
                    }
                    <Scrubber />
                    {/* <NoteBtns /> */}
                    <div className="flex w-full justify-center items-center space-x-4">
                        <button onClick={handleAddNote} className="btn btn-outline btn-primary">Add Note</button>
                        <button disabled={isSaving} onClick={handleSaveNote} className="btn btn-outline btn-secondary">Save Notes</button>
                    </div>
                    <div className="w-full rounded-lg bg-gray-200 py-4 px-2 flex flex-col space-y-4">
                        {
                            notes.map((note) => <Editor noteData={note.noteData} key={note.editorId} editorId={note.editorId} timeStamp={note.timeStamp} timeDisplay={note.timeDisplay} />)
                        }
                    </div>
                </div>

            </div>
        </PlayerContext.Provider>
    )
}
export const getServerSideProps = (async (context) => {
    try {
        //todo function to save/fetch from netlify blob
        
        console.log("url:", context.resolvedUrl)
        console.log(uuidValidate(context.resolvedUrl.substring(1)))

        if (uuidValidate(context.resolvedUrl.substring(1))) {
            //todo get associated data
            const myNote = await getNoteData(context.resolvedUrl.substring(1));
            if (myNote) {
                return {
                    props: {
                        myNote
                    }
                }
            } else {
                throw new Error("Unable to fetch note!");
            }
        } else {
            //todo generate uuid
            //todo save blob
            //todo return uuid + url
            if (ReactPlayer.canPlay(context.resolvedUrl)) {
                console.log("playable!")
                const myNote: VNote = {
                    id: uuidv4(),
                    url: context.resolvedUrl,
                };
                const saveResult = await saveNote(myNote);
                if (saveResult) {
                    return {
                        redirect: {
                            destination: `/${myNote.id}`,
                            permanent: false
                        }
                    }
                } else {
                    throw new Error("Note not saved!");
                }
            } else {
                throw new Error("Note not saved!");
            }
        }
    } catch (error) {
        console.error(error)
        //todo redirect to homepage
        return {
            redirect: {
              destination: "/", 
              permanent: false
            }
          };
    }

}) satisfies GetServerSideProps

export default Annotator