import { Observable, Subject } from 'rxjs';
import { ICoordinates } from '../maze-renderer/coordinates.interface';

export class PlayerPosition {
  public _positionSubject: Subject<ICoordinates> = new Subject<ICoordinates>();

  public get get$(): Observable<ICoordinates> {
    return this._positionSubject.asObservable();
  }

  public set(coordinates: ICoordinates): void {
    this._positionSubject.next(coordinates);
  }
}