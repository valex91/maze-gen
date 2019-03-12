import { VertexValue } from './vertex.interface';

export class Vertex {
    private _value: VertexValue;
    private _edges: Array<number> = [];

    constructor(value: VertexValue) {
        this._value = value;
    }

    public addEdge(edge: number) {
      this._edges.push(edge);
    }

    public removeEdge(edge: number) {
      this._edges = this._edges.map(currentE => currentE === edge ? -1 : currentE )
    }

    public getEdges(): number[] {
      return this._edges;
    }

    public getValue(): VertexValue {
      return this._value;
    }
}