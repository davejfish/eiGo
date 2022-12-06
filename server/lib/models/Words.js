import pool from '../../database.js';
import buildQuery from '../utils/wordUtils.js';
import wordArr from '../utils/wordUtils.js';

export default class Words {
  id;
  word;
  difficulty;

  constructor({ id, word, difficulty }) {
    this.id = id;
    this.word = word;
    this.difficulty = difficulty;
  }

  // add target phonic for better result
  static async getThreeLetterWords() {
    const { rows } = await pool.query(`
      SELECT word FROM three_letter_words
      LIMIT 36`);
    return rows.map(row => new Words(row));
  }
  
  static async createWordRows() {
    const [valueString, valueArr] = buildQuery();
    // runs insert for the table
    const { rows } = await pool.query(`
      INSERT INTO eigo_words
      (word, difficulty)
      VALUES
      ${valueString}
      RETURNING *`, valueArr);
    return new Words(rows[0]);
  }

};
