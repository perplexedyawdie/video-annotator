import { NoteDetails } from '@/pages/[...vidURL]';
import { Dispatch, SetStateAction, createContext } from 'react'
import ReactPlayer from 'react-player';

interface PlayerCtx {
    vidDuration: number;
    vidProgress: number;
    playerRef: React.RefObject<ReactPlayer>;
    setNotes: React.Dispatch<React.SetStateAction<NoteDetails[]>>;
    setVidDuration: React.Dispatch<React.SetStateAction<number>>;
    setVidProgress: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerContext  = createContext<PlayerCtx>({} as PlayerCtx)

export default PlayerContext