import { IVertexLocation } from '../graph/graph';

export class SiblingIndexGenerator {
  private readonly _boundaries: number;

  constructor(size: number) {
    this._boundaries = size;
  }

  public generateYSibling(row: number, column: number, difference: number): number | IVertexLocation {
    const _row = (row + difference);

    if (this._isOutSideBoundaries(_row)) {
      return Infinity;
    }

    return { row: _row, column };
  }

  public generateXSibling(row: number, column: number, difference: number): number | IVertexLocation {
    const _column = (column + difference);

    if (this._isOutSideBoundaries(_column)) {
      return Infinity;
    }

    return { row, column: _column };
  }

  _isOutSideBoundaries(value: number) {
    return value <= -1 || value >= this._boundaries;
  }
}