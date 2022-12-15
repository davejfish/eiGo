import pool from '../../database.js';
import buildQuery from '../utils/wordUtils.js';

export default class Words {
  id;
  word;
  difficulty;

  constructor({ id, word, difficulty }) {
    this.id = id;
    this.word = word;
    this.difficulty = difficulty;
  }

  static async getTargetWords(difficulty, target) {
    const { rows } = await pool.query(`
      SELECT word FROM eigo_words
      WHERE difficulty = $1 AND word LIKE $2
      ORDER BY random()
      LIMIT 5`, [difficulty, `%${target}%`]);
    return rows.map(row => row);
  }

  static async getFillerWords(difficulty, target) {
    const { rows } = await pool.query(`
      SELECT word FROM eigo_words
      WHERE difficulty = $1 AND word NOT LIKE $2
      ORDER BY random()
      LIMIT 31`, [difficulty, `%${target}%`]);
    return rows.map(row => row);
  }
  
  static async createWordRows() {
    const [valueString, valueArr] = buildQuery();
    const { rows } = await pool.query(`
      INSERT INTO eigo_words
      (word, difficulty)
      VALUES
      ${valueString}
      RETURNING *`, valueArr);
    return new Words(rows[0]);
  }

};
