import { Graph } from '../graph/graph';
import { VertexValue } from '../vertex/vertex.interface';
import { Vertex } from '../vertex/vertex';
import { SiblingIndexGenerator } from '../sibling-index-generator/sibling-index-generator';
import { Renderer } from '../renderer/renderer';

export class GridCreator {
  private _grid: Array<Array<VertexValue>>
  private _graph: Graph = new Graph();

  constructor(length: number, y: number, canvas: HTMLCanvasElement) {
    const siblingGenerator: SiblingIndexGenerator = new SiblingIndexGenerator(length, y);
    this._grid = []
    for (let i = 0; i < y; i++) {
      this._grid.push(Array.from({ length }, (_v: string, index: number): VertexValue => {
        const codedIndex: number = parseInt(i.toString() + index.toString());

        this._graph.AddVertex(codedIndex, '#');
        const newVertex: Vertex = this._graph.getVertex(codedIndex);

        const topSibling = siblingGenerator.generateYSibling(i, index, -1)
        const bottomSibling = siblingGenerator.generateYSibling(i, index, 1)
        const leftSibling = siblingGenerator.generateXSibling(i, index, -1)
        const rightSibling = siblingGenerator.generateXSibling(i, index, 1)


        newVertex.addEdge(topSibling);
        newVertex.addEdge(rightSibling);
        newVertex.addEdge(bottomSibling);
        newVertex.addEdge(leftSibling);

        return newVertex.getValue();
      }));
    }


    this._graph.createMaze(3)
    new Renderer(canvas, length, y).render(this._graph.getGraph())
  }
}