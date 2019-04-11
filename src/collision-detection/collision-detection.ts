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

  public isValidMovement(cords: ICoordinates): boolean {
    return this._walls.some((wall: IWall): boolean => {
       return cords.x < (wall.startingPoint.x + wall.width) &&
         cords.x > (wall.startingPoint.x )&&
         cords.y < (wall.startingPoint.y + 20) &&
         (cords.y + 20) > wall.startingPoint.y
    });
  }
}