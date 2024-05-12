import React, { useState } from 'react'
import { Scrubber, ScrubberProps } from 'react-scrubber';
// Note: ScrubberProps is a TypeScript interface and is not used for JS projects

import 'react-scrubber/lib/scrubber.css';

function VibScrubber() {
    const [scrubberVal, setScrubberVal] = useState<number>(0)
    const [start, setStart] = useState<number>(0)
    const [stop, setStop] = useState<number>(100)
  return (
    <div className="scrubber-container h-10">
    <Scrubber
      min={start}
      max={stop}
      value={scrubberVal}
    />
  </div>
  )
}

export default VibScrubber