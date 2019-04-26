import { IVertexLocation } from '../graph/graph';

export class Vertex {
  private _edges: Array<IVertexLocation | -1 > = [];

  public addEdge(edge: IVertexLocation | number) {
    this._edges.push(edge as IVertexLocation);
  }

  public removeEdge(edge: IVertexLocation) {
    this._edges = this._edges.map((currentE: IVertexLocation | -1) => {
      return (currentE === -1 || (currentE.column === edge.column) && (currentE.row === edge.row)) ? -1 : currentE
    })
  }

  public getEdges(): Array<IVertexLocation | -1> {
    return this._edges;
  }
}