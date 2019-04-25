import { inject } from 'inversion-box';
import { GameService } from './game-service/game-service';
import { GridCreator } from './grid-creator/grid-creator';
import { MainCanvasGenerator } from './main-canvas-generator/main-canvas-generator';
import { MazeRenderer } from './maze-renderer/mazeRenderer';
import './module';
import './style.css';

(() => {
  const gameService: GameService = inject<GameService>(GameService);
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

