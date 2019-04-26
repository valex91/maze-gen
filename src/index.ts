import gameService from './game-service/game-service';
import { GridCreator } from './grid-creator/grid-creator';
import { MainCanvasGenerator } from './main-canvas-generator/main-canvas-generator';
import { MazeRenderer } from './maze-renderer/mazeRenderer';
import './style.css';

(() => {
  let size: number = 5,
    render: MazeRenderer;
  gameService.onIteration(() => {
    if (render) {
      render.clearRender();
    }

    MainCanvasGenerator.remove();
    GridCreator.create(size++).then((
      oldR: MazeRenderer
    ) => render = oldR);
  });

  gameService.next();
})();

