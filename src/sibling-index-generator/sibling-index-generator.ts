export class SiblingIndexGenerator {
  private _y: number;
  private _x: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public generateYSibling(row: number, rowIndex: number, difference: number): number {
    const _row = (row + difference);

    if (this._isOutSideBoundaries(_row, this._y)) {
      return -1;
    }

    return parseInt(_row.toString() + rowIndex.toString());
  }

  public generateXSibling(row: number, rowIndex: number, difference: number): number {
    const _rowIndex = (rowIndex + difference);

    if (this._isOutSideBoundaries(_rowIndex, this._x)) {
      return -1;
    }

    return parseInt(row.toString() + _rowIndex.toString());
  }

  _isOutSideBoundaries(value: number, boundaries: number) {
    if (value <= -1 || value >= boundaries) {
      return true;
    }

    return false;
  }
}