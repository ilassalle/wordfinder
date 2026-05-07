import React, { useMemo, useState } from 'react';

type BoardSize = 4 | 5;

type BoardInputProps = {
    isLoading: boolean;
    onSubmit: (board: string[][]) => void;
};

function createBoard(size: BoardSize): string[][] {
    return Array.from({ length: size }, () => Array(size).fill(''));
}

const BoardInput: React.FC<BoardInputProps> = ({ isLoading, onSubmit }) => {
    const [boardSize, setBoardSize] = useState<BoardSize>(5);
    const [board, setBoard] = useState<string[][]>(() => createBoard(5));
    const isComplete = useMemo(() => board.every((row) => row.every(Boolean)), [board]);

    const handleSizeChange = (size: BoardSize) => {
        setBoardSize(size);
        setBoard(createBoard(size));
    };

    const handleChange = (row: number, col: number, value: string) => {
        const letter = value.replace(/[^a-z]/gi, '').slice(-1).toUpperCase();

        setBoard((currentBoard) =>
            currentBoard.map((currentRow, rowIndex) =>
                currentRow.map((cell, colIndex) => (rowIndex === row && colIndex === col ? letter : cell))
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isComplete) {
            onSubmit(board);
        }
    };

    return (
        <form className="board-form" onSubmit={handleSubmit}>
            <div className="form-heading">
                <h2>Input Board</h2>
                <div className="size-toggle" aria-label="Board size">
                    <button
                        type="button"
                        className={boardSize === 4 ? 'active' : ''}
                        onClick={() => handleSizeChange(4)}
                    >
                        4x4
                    </button>
                    <button
                        type="button"
                        className={boardSize === 5 ? 'active' : ''}
                        onClick={() => handleSizeChange(5)}
                    >
                        5x5
                    </button>
                </div>
            </div>
            <div className="board-grid" style={{ gridTemplateColumns: `repeat(${boardSize}, 3rem)` }}>
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <input
                            aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}`}
                            key={`${rowIndex}-${colIndex}`}
                            type="text"
                            inputMode="text"
                            maxLength={1}
                            value={cell}
                            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                        />
                    ))
                )}
            </div>
            <button className="primary-button" type="submit" disabled={!isComplete || isLoading}>
                {isLoading ? 'Finding...' : 'Find Words'}
            </button>
        </form>
    );
};

export default BoardInput;
