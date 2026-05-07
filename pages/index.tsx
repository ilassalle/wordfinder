import { useState } from 'react';
import BoardInput from '../components/BoardInput';
import WordList from '../components/WordList';
import Layout from '../components/Layout';

const Home = () => {
  const [words, setWords] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBoardSubmit = async (board: string[][]) => {
    setError('');
    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ board }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to find words for this board.');
      }

      setWords(Array.isArray(data.words) ? data.words : []);
    } catch (err) {
      setWords([]);
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="app-shell">
        <div className="intro">
          <h1>Word Finder</h1>
          <p>Enter a board and find words by connecting neighboring letters without reusing a tile.</p>
        </div>
        <BoardInput isLoading={isLoading} onSubmit={handleBoardSubmit} />
        {error && <p className="error-message">{error}</p>}
        <WordList hasSearched={hasSearched} words={words} />
      </section>
    </Layout>
  );
};

export default Home;
