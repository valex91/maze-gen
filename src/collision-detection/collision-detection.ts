import { IVertexLocation } from '../graph/graph';
import { ICoordinates } from '../maze-renderer/coordinates.interface';
import { Directions } from '../movements/Movements.enum';

export class CollisionDetection {
  private _cellBoundaries: Record<number, Record<number, Array<boolean>>> = {};

  public registerCellBoundaries(cords: ICoordinates, walls: Array<IVertexLocation | -1>) {
    (this._cellBoundaries[cords.x] ? this._cellBoundaries[cords.x] : this._cellBoundaries[cords.x] = {})[cords.y] = walls.map((n: IVertexLocation | -1) => {
      return n === -1;
    });
  }

  public isValidMovement(cords: ICoordinates, direction: Directions): boolean {
    return this._cellBoundaries[cords.x][cords.y][direction];
  }
}