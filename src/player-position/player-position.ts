import { Observable, Subject } from 'rxjs';
import { ICoordinates } from '../maze-renderer/coordinates.interface';
import wrongPathCheckerInstance from '../wrongPath/wrongPath';

export class PlayerPosition {
  public _positionSubject: Subject<ICoordinates> = new Subject<ICoordinates>();

  public get get$(): Observable<ICoordinates> {
    return this._positionSubject.asObservable();
  }

  public set(coordinates: ICoordinates): void {
    wrongPathCheckerInstance.walkCell(coordinates);
    this._positionSubject.next(coordinates);
  }
}

export default new PlayerPosition();
