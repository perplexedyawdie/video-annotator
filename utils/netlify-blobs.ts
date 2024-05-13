import { VNote } from '@/pages/[...vidURL]';
import { getStore } from '@netlify/blobs';

const store = getStore({
    name: 'note-store',
    siteID: process.env.NETLIFY_SITE_ID,
    token: process.env.NETLIFY_API_TOKEN,
})

export async function getAllBlobData() {
    return (await store.list()).blobs
}

export async function saveNote(noteData: VNote): Promise<boolean> {
    try {
        await store.setJSON(noteData.id, noteData)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export async function getNoteData(noteId: string): Promise<VNote | null> {
    try {
        const noteData = await store.get(noteId, {
            type: "json"
        });
        if (noteData) {
            return {
                id: noteData.id,
                url: noteData.url,
                noteDetails: noteData.noteDetails ?? null
            }
        } else {
            throw new Error("Unable to retrieve note!");
            
        }
    } catch (error) {
        console.error(error)
        return null
    }
}