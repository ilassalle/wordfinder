module.exports = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  outputFileTracingIncludes: {
    '/api/words': ['./data/collins-scrabble-words-2019.txt'],
  },
};
