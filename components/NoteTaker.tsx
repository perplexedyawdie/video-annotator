import React from 'react'
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

function NoteTaker() {
    const editor = useCreateBlockNote({
        trailingBlock: false
    });

    return (
        <>
            <BlockNoteView
                theme={lightDefaultTheme}
                editor={editor}
                formattingToolbar
                 />
        </>
    )
}

export default NoteTaker