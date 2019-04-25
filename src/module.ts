import { register } from 'inversion-box';
import { CollisionDetection } from './collision-detection/collision-detection';
import { GameService } from './game-service/game-service';
import { PlayerPosition } from './player-position/player-position';

(() => {
  register({ element: CollisionDetection });
  register({ element: PlayerPosition });
  register({ element: GameService });
})();