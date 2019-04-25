export class Vertex {
  private _edges: Array<number> = [];

  public addEdge(edge: number) {
    this._edges.push(edge);
  }

  public removeEdge(edge: number) {
    this._edges = this._edges.map(currentE => currentE === edge ? -1 : currentE)
  }

  public getEdges(): number[] {
    return this._edges;
  }
}