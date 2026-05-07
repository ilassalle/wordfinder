import { NextApiRequest, NextApiResponse } from 'next';

const wordsList = ['example', 'words', 'for', 'testing']; // Replace with actual word list or algorithm

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { board } = req.body;

        if (!board || (board.length !== 4 && board.length !== 5)) {
            return res.status(400).json({ error: 'Invalid board size. Please provide a 4x4 or 5x5 board.' });
        }

        // Implement word-finding logic here
        const foundWords = findWords(board); // Placeholder for actual word-finding function

        return res.status(200).json({ words: foundWords });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

function findWords(board: string[][]): string[] {
    // Placeholder for the actual word-finding algorithm
    return wordsList.filter(word => {
        // Implement logic to check if the word can be formed from the board
        return true; // Replace with actual condition
    });
}