import { useState } from 'react';
import BoardInput from '../components/BoardInput';
import WordList from '../components/WordList';
import Layout from '../components/Layout';

const Home = () => {
  const [words, setWords] = useState([]);

  const handleBoardSubmit = async (board) => {
    const response = await fetch('/api/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ board }),
    });
    const data = await response.json();
    setWords(data.words);
  };

  return (
    <Layout>
      <h1>Word Finder</h1>
      <BoardInput onSubmit={handleBoardSubmit} />
      <WordList words={words} />
    </Layout>
  );
};

export default Home;