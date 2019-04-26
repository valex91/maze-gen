import { Vertex } from '../vertex/vertex';
import { VisitedNodesHelper } from './visited-nodes-helper';

export interface IVertexLocation {
  row: number;
  column: number;
}

export class Graph {
  private readonly _adjacencyList: Array<Array<Vertex>>;

  constructor() {
    this._adjacencyList = [];
  }

  public AddVertex(row: number, column: number) {
    const newVertex: Vertex = new Vertex();
    if (this._adjacencyList[row]) {
      this._adjacencyList[row][column] = newVertex;
    } else {
      this._adjacencyList[row] = [];
      this._adjacencyList[row][column] = newVertex;
    }
  }

  public getVertex(row: number, column: number): Vertex {
    return this._adjacencyList[row][column];
  }

  public removeEdge(firstIndex: IVertexLocation, secondIndex: IVertexLocation): void {
    if (this._adjacencyList[firstIndex.row] && this._adjacencyList[firstIndex.row][firstIndex.column]) {
      this._adjacencyList[firstIndex.row][firstIndex.column].removeEdge(secondIndex);
    }

    if (this._adjacencyList[secondIndex.row] && this._adjacencyList[secondIndex.row][secondIndex.column]) {
      this._adjacencyList[secondIndex.row][secondIndex.column].removeEdge(firstIndex);
    }
  }

  public generateEntropy(startingIndex: IVertexLocation): void {
    let nodesToGo: number = this._adjacencyList.length + this._adjacencyList.reduce((acc: number, column: Array<Vertex>) => {
        acc += (column.length - 1);
        return acc;
      }, 0) ,
      current: IVertexLocation = startingIndex;
    const stack: IVertexLocation[] = [startingIndex],
      visitedNodes: VisitedNodesHelper = new VisitedNodesHelper();
    visitedNodes.declareNodeAsVisited(startingIndex.row, startingIndex.column);

    while (nodesToGo) {
      const unvisitedSiblings: Array<IVertexLocation | -1> = this._adjacencyList[current.row][current.column].getEdges().filter(
        (sibling: IVertexLocation | -1) => {
          return (sibling !== -1 && (sibling as unknown as number) !== Infinity) && !visitedNodes.isVertexVisited(
            sibling.row,
            sibling.column
          );
        });
      if (unvisitedSiblings.length) {
        const randomSibling: number = this._pickRandomIndex(unvisitedSiblings.length);
        stack.push(current);
        this.removeEdge(current, unvisitedSiblings[randomSibling] as IVertexLocation);
        current = unvisitedSiblings[randomSibling] as IVertexLocation;
        visitedNodes.declareNodeAsVisited(current.row, current.column);
        nodesToGo--;
      } else {
        if (stack.length) {
          current = stack.pop() as IVertexLocation;
        } else {
          break;
        }
      }
    }
  }

  public getGraph(): Array<Array<Vertex>> {
    return this._adjacencyList
  }

  private _pickRandomIndex(length: number) {
    return Math.floor((Math.random() * 71) % length);
  }
}