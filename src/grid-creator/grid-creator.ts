import { Graph } from '../graph/graph';
import { MazeRenderer } from '../maze-renderer/mazeRenderer';
import { SiblingIndexGenerator } from '../sibling-index-generator/sibling-index-generator';
import { Vertex } from '../vertex/vertex';

export class GridCreator {
  public static create(size: number): Promise<MazeRenderer> {
    return new Promise((res) => {
      const _graph = new Graph();
      const siblingGenerator: SiblingIndexGenerator = new SiblingIndexGenerator(size);
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          _graph.AddVertex(i, j);
          const newVertex: Vertex = _graph.getVertex(i,j);

          const topSibling = siblingGenerator.generateYSibling(i, j, -1);
          const bottomSibling = siblingGenerator.generateYSibling(i, j, 1);
          const leftSibling = siblingGenerator.generateXSibling(i, j, -1);
          const rightSibling = siblingGenerator.generateXSibling(i, j, 1);

          newVertex.addEdge(topSibling);
          newVertex.addEdge(rightSibling);
          newVertex.addEdge(bottomSibling);
          newVertex.addEdge(leftSibling);
        }
      }

      _graph.generateEntropy({ row: 0, column: 0 });
      const renderInstance = new MazeRenderer(size);
      renderInstance.render(_graph.getGraph());
      res(renderInstance);
    });
  }
}