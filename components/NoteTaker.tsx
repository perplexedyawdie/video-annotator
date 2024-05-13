import React, { useContext } from 'react'
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import PlayerContext from '@/context/PlayerCtx';

interface Props {
    editorId: string;
    timeStamp: number;
    timeDisplay: string;
    noteData: string;
}

function getInitialContent(noteData: string) {
    try {
        return JSON.parse(noteData)
    } catch (error) {
        console.error(error)
        return undefined
    }
}

function NoteTaker({ editorId, timeStamp, timeDisplay, noteData }: Props) {
    const { setNotes } = useContext(PlayerContext);
    const editor = useCreateBlockNote({
        trailingBlock: false,
        initialContent: getInitialContent(noteData),
    });

    function handleContentChange(): void {
        //todo find note by editor id
        setNotes((prev) => {
            const currNoteIdx = prev.findIndex((note) => note.editorId === editorId);
            if (currNoteIdx !== -1) {
                const newNotes = [...prev];
                newNotes[currNoteIdx].noteData = JSON.stringify(editor.document)
                return [...newNotes]
            } else {
                return [...prev]
            }
        })
    }

    return (
        <div>
            <span
                className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="-ms-1 me-1.5 h-4 w-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>

                <p className="whitespace-nowrap text-sm">Timestamp: {timeDisplay}</p>
            </span>
            

            <BlockNoteView
                onChange={handleContentChange}
                theme={lightDefaultTheme}
                editor={editor}
                formattingToolbar
            />
        </div>
    )
}

export default NoteTaker