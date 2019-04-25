import { ICoordinates } from '../maze-renderer/coordinates.interface';
import { Directions } from '../movements/Movements.enum';

export class CollisionDetection {
  private _cellBoundaries: Record<number, Record<number, Array<boolean>>> = {};

  public registerCellBoundaries(cords: ICoordinates, walls: number[]) {
    (this._cellBoundaries[cords.x] ? this._cellBoundaries[cords.x] : this._cellBoundaries[cords.x] = {})[cords.y] = walls.map((n: number) => {
      return n === -1;
    });
  }

  public isValidMovement(cords: ICoordinates, direction: Directions): boolean {
    return this._cellBoundaries[cords.x][cords.y][direction];
  }
}