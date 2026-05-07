import React from 'react';

interface WordListProps {
  words: string[];
}

const WordList: React.FC<WordListProps> = ({ words }) => {
  return (
    <div>
      <h2>Available Words</h2>
      {words.length > 0 ? (
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      ) : (
        <p>No words found. Please try a different board.</p>
      )}
    </div>
  );
};

export default WordList;