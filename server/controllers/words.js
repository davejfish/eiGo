import { Router } from 'express';
import Words from '../lib/models/Words.js';
import shuffle from '../lib/utils/sort.js';


export default Router()
  .get('/:difficulty/:target', async (req, res, next) => {
    try {
      const targetWords = await Words.getTargetWords(
        req.params.difficulty, 
        req.params.target.toString()
      );
      const fillerWords = await Words.getFillerWords(
        req.params.difficulty, 
        req.params.target.toString()
      );
      const sortedWords = shuffle([...targetWords, ...fillerWords]);
      res.json(sortedWords);
    } catch (err) {
      next(err);
    }
  });
