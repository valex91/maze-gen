export class VisitedNodesHelper {
  private _visitedNodes: { [key: number]: Array<boolean> } = {};

  public declareNodeAsVisited(row: number, column: number): void {
    if (this._visitedNodes[row]) {
      (this._visitedNodes[row] as Array<boolean>)[column] = true;
    } else {
      this._visitedNodes[row] = [];
      (this._visitedNodes[row] as Array<boolean>)[column] = true;
    }
  }

  public isVertexVisited(row: number, column: number): boolean {
    if (this._visitedNodes[row]) {
      return (this._visitedNodes[row] as Array<boolean>)[column]
    } else {
      return false;
    }
  }
}