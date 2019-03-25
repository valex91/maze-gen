import { LayerGenerator } from '../layer-generator/layer-generator';
import { ICoordinates } from '../maze-renderer/coordinates.interface';

export class PlayerLayer extends LayerGenerator {
  private readonly _halfOfCellSize: number;
  private readonly _quarterOfCellSize: number;

  protected constructor(canvas: HTMLCanvasElement, cellSize: number) {
    super(canvas);
    this._halfOfCellSize = Math.floor(cellSize / 2);
    this._quarterOfCellSize = Math.floor(this._halfOfCellSize / 2);
  }

  public static create(canvas: HTMLCanvasElement, cellSize: number): PlayerLayer {
    return new PlayerLayer(canvas, cellSize)
  }

  public init(coords: ICoordinates): void {
    this._drawPlayer(coords);
  }

  private _drawPlayer(coords: ICoordinates): void {
    this._context.rect(
      (coords.x + this._halfOfCellSize) - this._quarterOfCellSize,
      (coords.y + this._halfOfCellSize) - this._quarterOfCellSize,
      this._halfOfCellSize,
      this._halfOfCellSize
    );

    this._context.fill();
  }

  public drawGoal(coords: ICoordinates): void {
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