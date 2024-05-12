import { Dispatch, SetStateAction, createContext } from 'react'

interface PlayerCtx {
    
}

const PlayerContext  = createContext<PlayerCtx>({} as PlayerCtx)

export default PlayerContext