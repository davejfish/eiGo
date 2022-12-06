import { Router } from 'react-router-dom';
import Words from '../lib/models/Words';


export default Router()
  .get('/3-letters', async (req, res, next) => {
    const words = await Words.getThreeLetterWords();
    console.log('the words are: ', words);
  });
