import { inject } from 'inversion-box';
import { Subscription } from 'rxjs';
import { CollisionDetection } from '../collision-detection/collision-detection';
import { LayerGenerator } from '../layer-generator/layer-generator';
import { ICoordinates } from '../maze-renderer/coordinates.interface';
import { Movements } from '../movements/movements';
import { Directions } from '../movements/Movements.enum';
import { PlayerPosition } from '../player-position/player-position';

export class PlayerLayer extends LayerGenerator {
  public layerCanvas: HTMLCanvasElement;
  private readonly _halfOfCellSize: number;
  private readonly _quarterOfCellSize: number;
  private readonly _playerSize: number;
  private readonly _collisionDetection: CollisionDetection = inject(CollisionDetection);
  private _cords?: ICoordinates;
  private _playerPosition: PlayerPosition;
  private _movements: Subscription;

  protected constructor(canvas: HTMLCanvasElement, cellSize: number, movements: Movements) {
    super(canvas);
    this.layerCanvas = canvas;
    this._halfOfCellSize = Math.floor(cellSize / 2);
    this._playerSize = this._halfOfCellSize;
    this._quarterOfCellSize = Math.floor(this._halfOfCellSize / 2);
    this._playerPosition = inject<PlayerPosition>(PlayerPosition);

    this._movements = movements.movementsStream().subscribe((direction: Directions) => {
      this._reDraw(direction);
    });
  }

  public static create(canvas: HTMLCanvasElement, cellSize: number, movements: Movements): PlayerLayer {
    return new PlayerLayer(canvas, cellSize, movements)
  }

  public init(coords: ICoordinates): void {
    this._cords = coords;
    this._drawPlayer(coords);
  }

  public clear() {
    this._movements.unsubscribe();
  }

  private _reDraw(direction: Directions) {
    if (this._cords) {
      if (!this._collisionDetection.isValidMovement(this._cords, direction)) {
        return;
      }

      switch (direction) {
        case  Directions.Left:
          this._cords.x = this._cords.x - (this._playerSize * 2);
          this._drawPlayer(this._cords);
          break;
        case Directions.Right:
          this._cords.x = this._cords.x + (this._playerSize * 2);
          this._drawPlayer(this._cords);
          break;
        case  Directions.Up:
          this._cords.y = this._cords.y - (this._playerSize * 2);
          this._drawPlayer(this._cords);
          break;
        case Directions.Down :
          this._cords.y = this._cords.y + (this._playerSize * 2);
          this._drawPlayer(this._cords);
          break;
      }

      this._playerPosition.set(this._cords);
    }
  }

  private _drawPlayer(coords: ICoordinates): void {
    this._context.clearRect(0, 0, this.layerCanvas.width, this.layerCanvas.height);
    this._context.beginPath();
    this._context.rect(
      (coords.x + this._halfOfCellSize) - this._quarterOfCellSize,
      (coords.y + this._halfOfCellSize) - this._quarterOfCellSize,
      this._halfOfCellSize,
      this._halfOfCellSize
    );

    this._context.fill();
    this._context.closePath();
  }
}