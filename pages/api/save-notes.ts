import { saveNote } from '@/utils/netlify-blobs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        //todo validate note data
        const noteData = req.body.noteData;
        const saveRes = await saveNote(noteData);
        res.json({
            result: saveRes
        });
    } catch (error) {
        console.error(error)
        res.json({
            result: false
        })
    }


}