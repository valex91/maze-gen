export class SiblingIndexGenerator {
  private _boundaries: number;

  constructor(size: number) {
    this._boundaries = size;
  }

  public generateYSibling(row: number, rowIndex: number, difference: number): number {
    const _row = (row + difference);

    if (this._isOutSideBoundaries(_row)) {
      return Infinity;
    }

    return parseInt(_row.toString() + rowIndex.toString());
  }

  public generateXSibling(row: number, rowIndex: number, difference: number): number {
    const _rowIndex = (rowIndex + difference);

    if (this._isOutSideBoundaries(_rowIndex)) {
      return Infinity;
    }

    return parseInt(row.toString() + _rowIndex.toString());
  }

  _isOutSideBoundaries(value: number) {
    return value <= -1 || value >= this._boundaries;
  }
}