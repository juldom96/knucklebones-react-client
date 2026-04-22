const ROW_COUNT = 3;
const FIELD_COUNT = 3;
const INACTIVE_FIELD = { value: null, isValidMove: false };
const ACTIVE_FIELD = { value: null, isValidMove: true };

export default class Board {
  constructor(initialBoard) {
    this.validateBoard(initialBoard);
    this.rows = this.createRows(initialBoard);
  }

  validateBoard(board) {
    if (!Array.isArray(board) || board.length !== ROW_COUNT) {
      throw new Error(`The board must be an array with ${ROW_COUNT} rows.`);
    }

    board.forEach((row) => {
      if (
        typeof row.rowScore !== "number" ||
        !Array.isArray(row.placedDice) ||
        row.placedDice.length > FIELD_COUNT
      ) {
        throw new Error(
          `Each row must be an object with "rowScore" (number) and "placedDice" (array with up to ${FIELD_COUNT} fields).`
        );
      }
    });
  }

  createRows(board) {
    return board.map((row) => {
      let hasValidMove = false;
      const fields = [];

      for (let col = 0; col < FIELD_COUNT; col++) {
        const dice = row.placedDice[col];
        if (dice) {
          fields.push({ value: dice, isValidMove: false });
        } else if (!hasValidMove) {
          fields.push(ACTIVE_FIELD);
          hasValidMove = true;
        } else {
          fields.push(INACTIVE_FIELD);
        }
      }

      return { fields, rowScore: row.rowScore };
    });
  }

  updateBoard(newBoard) {
    this.validateBoard(newBoard);
    this.rows = this.createRows(newBoard);
  }
}
