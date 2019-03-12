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
    if (this._adjacencyList[fistIndex]) {
      this._adjacencyList[fistIndex].removeEdge(secondIndex);
    }

    if (this._adjacencyList[secondIndex]) {
      this._adjacencyList[secondIndex].removeEdge(fistIndex);
    }
  }

  public createMaze(startingIndex: number): void {
    const stack: number[] = [startingIndex],
      visitedNodes: Array<boolean> = [];
    visitedNodes[-1] = true;
    visitedNodes[startingIndex] = true;
    let helper: (i: number) => void;

    (helper = (i) => {
      if (visitedNodes.length < this._adjacencyList.length) {
        visitedNodes[i] = true;
        const unvisitedSiblings: Array<number> = this._adjacencyList[i].getEdges().filter((sibling: number) => !visitedNodes[sibling]);
        if (unvisitedSiblings.length) {
          const randomSibling: number = this._pickRandomIndex(unvisitedSiblings.length);
          this.removeEdge(unvisitedSiblings[randomSibling], i)
          stack.push(i)
          helper(unvisitedSiblings[randomSibling]);
        } else {
          if (stack.length) {
            helper(stack.pop() as number);
          }
        }
      }
    })(startingIndex);

    console.log(this._adjacencyList);
  }

  public getGraph(): Array<Vertex> {
    return this._adjacencyList
  }

  private _pickRandomIndex(length: number) {
    return Math.floor(Math.random() * length);
  }
}