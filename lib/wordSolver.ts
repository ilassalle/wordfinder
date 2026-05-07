import fs from 'fs';
import path from 'path';

export type Board = string[][];

type TrieNode = {
  children: Map<string, TrieNode>;
  word?: string;
};

const WORD_LIST_PATH = path.join(process.cwd(), 'data', 'collins-scrabble-words-2019.txt');
const MIN_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 25;

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;

function createNode(): TrieNode {
  return { children: new Map() };
}

function buildTrie(words: readonly string[]): TrieNode {
  const root = createNode();

  for (const word of words) {
    let node = root;

    for (const letter of word) {
      let next = node.children.get(letter);

      if (!next) {
        next = createNode();
        node.children.set(letter, next);
      }

      node = next;
    }

    node.word = word;
  }

  return root;
}

let wordTrie: TrieNode | undefined;

function loadWords(): string[] {
  return fs
    .readFileSync(WORD_LIST_PATH, 'utf8')
    .split(/\r?\n/)
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length >= MIN_WORD_LENGTH && word.length <= MAX_WORD_LENGTH && /^[a-z]+$/.test(word));
}

function getWordTrie(): TrieNode {
  if (!wordTrie) {
    wordTrie = buildTrie(loadWords());
  }

  return wordTrie;
}

export function validateBoard(input: unknown): { board: Board } | { error: string } {
  if (!Array.isArray(input)) {
    return { error: 'Board must be a 4x4 or 5x5 array of letters.' };
  }

  const size = input.length;

  if (size !== 4 && size !== 5) {
    return { error: 'Board must have exactly 4 or 5 rows.' };
  }

  const board: Board = [];

  for (const row of input) {
    if (!Array.isArray(row) || row.length !== size) {
      return { error: `Board must be a square ${size}x${size} grid.` };
    }

    const normalizedRow: string[] = [];

    for (const cell of row) {
      if (typeof cell !== 'string' || !/^[A-Za-z]$/.test(cell)) {
        return { error: 'Each board cell must contain exactly one letter.' };
      }

      normalizedRow.push(cell.toLowerCase());
    }

    board.push(normalizedRow);
  }

  return { board };
}

export function findWords(board: Board): string[] {
  const size = board.length;
  const found = new Set<string>();
  const visited = Array.from({ length: size }, () => Array<boolean>(size).fill(false));

  function walk(row: number, col: number, node: TrieNode): void {
    const next = node.children.get(board[row][col]);

    if (!next) {
      return;
    }

    if (next.word) {
      found.add(next.word);
    }

    visited[row][col] = true;

    for (const [rowOffset, colOffset] of DIRECTIONS) {
      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;

      if (
        nextRow >= 0 &&
        nextRow < size &&
        nextCol >= 0 &&
        nextCol < size &&
        !visited[nextRow][nextCol]
      ) {
        walk(nextRow, nextCol, next);
      }
    }

    visited[row][col] = false;
  }

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      walk(row, col, getWordTrie());
    }
  }

  return Array.from(found).sort((a, b) => b.length - a.length || a.localeCompare(b));
}
