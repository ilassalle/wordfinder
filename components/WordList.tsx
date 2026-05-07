import React, { useEffect, useMemo, useState } from 'react';

interface WordListProps {
  words: string[];
  hasSearched: boolean;
}

type WordTab = {
  id: string;
  label: string;
  filter: (word: string) => boolean;
};

const WORD_TABS: WordTab[] = [
  { id: 'all', label: 'All words', filter: () => true },
  { id: '7-plus', label: '7+', filter: (word) => word.length >= 7 },
  { id: '6', label: '6', filter: (word) => word.length === 6 },
  { id: '5', label: '5', filter: (word) => word.length === 5 },
  { id: '4', label: '4', filter: (word) => word.length === 4 },
  { id: '3', label: '3', filter: (word) => word.length === 3 },
];

const WordList: React.FC<WordListProps> = ({ words, hasSearched }) => {
  const [activeTabId, setActiveTabId] = useState(WORD_TABS[0].id);
  const tabCounts = useMemo(
    () =>
      WORD_TABS.reduce<Record<string, number>>((counts, tab) => {
        counts[tab.id] = words.filter(tab.filter).length;
        return counts;
      }, {}),
    [words]
  );
  const activeTab = WORD_TABS.find((tab) => tab.id === activeTabId) ?? WORD_TABS[0];
  const visibleWords = useMemo(() => words.filter(activeTab.filter), [activeTab, words]);

  useEffect(() => {
    setActiveTabId(WORD_TABS[0].id);
  }, [words]);

  return (
    <section className="results-panel" aria-live="polite">
      <h2>Available Words</h2>
      {!hasSearched ? (
        <p>Fill the board to start finding words.</p>
      ) : words.length > 0 ? (
        <>
          <div className="word-tabs" role="tablist" aria-label="Filter words by length">
            {WORD_TABS.map((tab) => (
              <button
                aria-selected={activeTabId === tab.id}
                className={activeTabId === tab.id ? 'active' : ''}
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                role="tab"
                type="button"
              >
                <span>{tab.label}</span>
                <span className="tab-count">{tabCounts[tab.id]}</span>
              </button>
            ))}
          </div>
          {visibleWords.length > 0 ? (
            <ul className="word-list">
              {visibleWords.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-tab-message">No {activeTab.label.toLowerCase()} found.</p>
          )}
        </>
      ) : (
        <p>No words found. Please try a different board.</p>
      )}
    </section>
  );
};

export default WordList;
