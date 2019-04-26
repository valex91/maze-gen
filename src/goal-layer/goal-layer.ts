import { Subscription } from 'rxjs';
import gameService from '../game-service/game-service';
import { LayerGenerator } from '../layer-generator/layer-generator';
import { ICoordinates } from '../maze-renderer/coordinates.interface';
import playerPosition, { PlayerPosition } from '../player-position/player-position';

export class GoalLayer extends LayerGenerator {
  private readonly _halfOfCellSize: number;
  private readonly _quarterOfCellSize: number;
  private _playerMovementsSubscription: Subscription;
  private _goalPosition: ICoordinates = {} as Partial<ICoordinates> as ICoordinates;
  private readonly _playerMovements: PlayerPosition = playerPosition;

  protected constructor(canvas: HTMLCanvasElement, cellSize: number) {
    super(canvas);
    this._halfOfCellSize = Math.floor(cellSize / 2);
    this._quarterOfCellSize = Math.floor(this._halfOfCellSize / 2);
    this._playerMovementsSubscription = this._playerMovements.get$.subscribe((position: ICoordinates) => {
      if (position.x === this._goalPosition.x && this._goalPosition.y === position.y) {
        gameService.next();
      }
    });
  }

  public static create(canvas: HTMLCanvasElement, cellSize: number): GoalLayer {
    return new GoalLayer(canvas, cellSize)
  }

  public init(coords: ICoordinates): void {
    this._drawGoal(coords);
  }

  public clear(): void {
    this._playerMovementsSubscription.unsubscribe();
  }

  public _drawGoal(coords: ICoordinates): void {
    this._goalPosition = coords;
    this._context.rect(
      (coords.x + this._halfOfCellSize) - this._quarterOfCellSize,
      (coords.y + this._halfOfCellSize) - this._quarterOfCellSize,
      this._halfOfCellSize,
      this._halfOfCellSize
    );
    this._context.fillStyle = 'red';
    this._context.fill();
  }
}