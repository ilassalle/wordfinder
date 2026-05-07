import React from 'react';

interface WordListProps {
  words: string[];
  hasSearched: boolean;
}

const WordList: React.FC<WordListProps> = ({ words, hasSearched }) => {
  return (
    <section className="results-panel" aria-live="polite">
      <h2>Available Words</h2>
      {!hasSearched ? (
        <p>Fill the board to start finding words.</p>
      ) : words.length > 0 ? (
        <ul className="word-list">
          {words.map((word, index) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      ) : (
        <p>No words found. Please try a different board.</p>
      )}
    </section>
  );
};

export default WordList;
