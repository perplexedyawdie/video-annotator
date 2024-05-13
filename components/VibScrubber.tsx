import PlayerContext from '@/context/PlayerCtx';
import React, { useState, useContext } from 'react'
import { Scrubber, ScrubberProps } from 'react-scrubber';
// Note: ScrubberProps is a TypeScript interface and is not used for JS projects

import 'react-scrubber/lib/scrubber.css';

function VibScrubber() {
    const [scrubberVal, setScrubberVal] = useState<number>(0)
    const [start, setStart] = useState<number>(0)
    const [stop, setStop] = useState<number>(100)
    const { vidDuration, vidProgress, playerRef } = useContext(PlayerContext);
    function handleScrubChange(value: number): void {
        if (playerRef.current) {
            playerRef.current.seekTo((value / 3), "seconds")
        }
    }

    return (
        <div className="scrubber-container h-10">
            <Scrubber
                className="h-full"
                min={0}
                max={vidDuration * 3}
                value={vidProgress * 3}
                onScrubChange={handleScrubChange}
            />
        </div>
    )
}

export default VibScrubber