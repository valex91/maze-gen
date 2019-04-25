import { Vertex } from '../vertex/vertex';
export class Graph {
  private readonly _adjacencyList: Array<Vertex>;

  constructor() {
    this._adjacencyList = [];
  }

  public AddVertex(graphIndex: number) {
    this._adjacencyList[graphIndex] = new Vertex();
  }

  public getVertex(vertexIndex: number) {
    return this._adjacencyList[vertexIndex];
  }

  public removeEdge(fistIndex: number, secondIndex: number): void {
    this._adjacencyList[fistIndex].removeEdge(secondIndex);
    this._adjacencyList[secondIndex].removeEdge(fistIndex);
  }

  public generateEntropy(startingIndex: number): void {
    let nodesToGo: number = this._adjacencyList.length - 1,
      current: number = startingIndex;
    const stack: number[] = [startingIndex],
      visitedNodes: { [key: number]: boolean } = {};
    visitedNodes[-1] = true;
    visitedNodes[Infinity] = true;
    visitedNodes[startingIndex] = true;

    while (nodesToGo) {
      const unvisitedSiblings: Array<number> = this._adjacencyList[current].getEdges().filter((sibling: number) => !visitedNodes[sibling]);
      if (unvisitedSiblings.length) {
        const randomSibling: number = this._pickRandomIndex(unvisitedSiblings.length);
        stack.push(current);
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
    return Math.floor((Math.random() * 71) % length);
  }
}