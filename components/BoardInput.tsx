import React, { useState } from 'react';

const BoardInput: React.FC<{ onSubmit: (board: string[][]) => void }> = ({ onSubmit }) => {
    const [board, setBoard] = useState<string[][]>([Array(5).fill(''), Array(5).fill(''), Array(5).fill(''), Array(5).fill(''), Array(5).fill('')]);

    const handleChange = (row: number, col: number, value: string) => {
        const newBoard = [...board];
        newBoard[row][col] = value.toUpperCase();
        setBoard(newBoard);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(board);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Input Board (5x5 or 4x4)</h2>
            {board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <input
                            key={colIndex}
                            type="text"
                            maxLength={1}
                            value={cell}
                            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                        />
                    ))}
                </div>
            ))}
            <button type="submit">Find Words</button>
        </form>
    );
};

export default BoardInput;