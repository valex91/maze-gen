import { ICoordinates } from '../maze-renderer/coordinates.interface';

export interface IWall {
  startingPoint: ICoordinates;
  endingPoint: ICoordinates;
  width: number;
}

export class CollisionDetection {
  private _walls: Array<IWall> = [];

  public registerWall(wall: IWall) {
    this._walls.push(wall);
  }
}