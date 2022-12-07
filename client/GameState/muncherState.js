import { fetchWords } from '../services/wordService.js';

const gameData = [
  { position: 0, right: 1, left: null, up: null, down: 6, word: null },
  { position: 1, right: 2, left: 0, up: null, down: 7, word: null },
  { position: 2, right: 3, left: 1, up: null, down: 8, word: null },
  { position: 3, right: 4, left: 2, up: null, down: 9, word: null },
  { position: 4, right: 5, left: 3, up: null, down: 10, word: null },
  { position: 5, right: null, left: 4, up: null, down: 11, word: null },
  { position: 6, right: 7, left: null, up: 0, down: 12, word: null },
  { position: 7, right: 8, left: 6, up: 1, down: 13, word: null },
  { position: 8, right: 9, left: 7, up: 2, down: 14, word: null },
  { position: 9, right: 10, left: 8, up: 3, down: 15, word: null },
  { position: 10, right: 11, left: 9, up: 4, down: 16, word: null },
  { position: 11, right: null, left: 10, up: 5, down: 17, word: null },
  { position: 12, right: 13, left: null, up: 6, down: 18, word: null },
  { position: 13, right: 14, left: 12, up: 7, down: 19, word: null },
  { position: 14, right: 15, left: 13, up: 8, down: 20, word: null },
  { position: 15, right: 16, left: 14, up: 9, down: 21, word: null },
  { position: 16, right: 17, left: 15, up: 10, down: 22, word: null },
  { position: 17, right: null, left: 16, up: 11, down: 23, word: null },
  { position: 18, right: 19, left: null, up: 12, down: 24, word: null },
  { position: 19, right: 20, left: 18, up: 13, down: 25, word: null },
  { position: 20, right: 21, left: 19, up: 14, down: 26, word: null },
  { position: 21, right: 22, left: 20, up: 15, down: 27, word: null },
  { position: 22, right: 23, left: 21, up: 16, down: 28, word: null },
  { position: 23, right: null, left: 22, up: 17, down: 29, word: null },
  { position: 24, right: 25, left: null, up: 18, down: 30, word: null },
  { position: 25, right: 26, left: 24, up: 19, down: 31, word: null },
  { position: 26, right: 27, left: 25, up: 20, down: 32, word: null },
  { position: 27, right: 28, left: 26, up: 21, down: 33, word: null },
  { position: 28, right: 29, left: 27, up: 22, down: 34, word: null },
  { position: 29, right: null, left: 28, up: 23, down: 35, word: null },
  { position: 30, right: 31, left: null, up: 24, down: null, word: null },
  { position: 31, right: 32, left: 30, up: 25, down: null, word: null },
  { position: 32, right: 33, left: 31, up: 26, down: null, word: null },
  { position: 33, right: 34, left: 32, up: 27, down: null, word: null },
  { position: 34, right: 35, left: 33, up: 28, down: null, word: null },
  { position: 35, right: null, left: 34, up: 29, down: null, word: null },
];

export default async function newGame(difficulty, target) {
  const words = await fetchWords(difficulty, target);
  return gameData.map((wordData, index) => {
    console.log('wordData is: ', wordData);
    wordData.word = words[index].word.toLowerCase();
    return wordData;
  });
}
