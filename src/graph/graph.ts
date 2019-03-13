import { VertexValue } from '../vertex/vertex.interface';
import { Vertex } from '../vertex/vertex';

export class Graph {
  private _adjacencyList: Array<Vertex>
  constructor() {
    this._adjacencyList = [];
  }

  public AddVertex(graphIndex: number, vertexValue: VertexValue) {
    this._adjacencyList[graphIndex] = new Vertex(vertexValue);
    return this._adjacencyList[graphIndex].getValue()
  }

  public getVertex(vertexIndex: number) {
    return this._adjacencyList[vertexIndex];
  }

  public addEdge(firstIndex: number, secondIndex: number) {
    if (this._adjacencyList[firstIndex]) {
      this._adjacencyList[firstIndex].addEdge(secondIndex);
    }

    if (this._adjacencyList[secondIndex]) {
      this._adjacencyList[secondIndex].addEdge(firstIndex);
    }
  }

  public removeEdge(fistIndex: number, secondIndex: number): void {
    if (this._adjacencyList[fistIndex] && this._adjacencyList[secondIndex]) {
      this._adjacencyList[fistIndex].removeEdge(secondIndex);
      this._adjacencyList[secondIndex].removeEdge(fistIndex);
    }
  }

  public create(startingIndex: number) {
    let nodesToGo: number = this._adjacencyList.length - 2,
      current: number = startingIndex;
    const stack: number[] = [startingIndex],
      visitedNodes: { [key: number]: boolean } = {};
    visitedNodes[-1] = true;
    visitedNodes[startingIndex] = true;

    while (nodesToGo) {
      const unvisitedSiblings: Array<number> = this._adjacencyList[current].getEdges().filter((sibling: number) => !visitedNodes[sibling]);
      if (unvisitedSiblings.length) {
        const randomSibling: number = this._pickRandomIndex(unvisitedSiblings.length);
        stack.push(current)
        this.removeEdge(current, unvisitedSiblings[randomSibling]);
        current = unvisitedSiblings[randomSibling];
        visitedNodes[current] = true;
        nodesToGo--;
      } else {
        if (stack.length) {
          current = stack.pop() as number;
        } else {
          break;
        }
      }
    }
  }

  public getGraph(): Array<Vertex> {
    return this._adjacencyList
  }

  private _pickRandomIndex(length: number) {
    return Math.floor(Math.random() * length);
  }
}