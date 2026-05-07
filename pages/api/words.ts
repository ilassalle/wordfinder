import { NextApiRequest, NextApiResponse } from 'next';
import { findWords, validateBoard } from '../../lib/wordSolver';

type WordsResponse = {
    words: string[];
};

type ErrorResponse = {
    error: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<WordsResponse | ErrorResponse>) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const result = validateBoard(req.body?.board);

    if ('error' in result) {
        return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ words: findWords(result.board) });
}
