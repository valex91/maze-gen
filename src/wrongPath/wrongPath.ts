import { Observable, Subject } from 'rxjs';
import { VisitedNodesHelper } from '../graph/visited-nodes-helper';
import { ICoordinates } from '../maze-renderer/coordinates.interface';

class WrongPathChecker {
  private _visitedPaths: VisitedNodesHelper = new VisitedNodesHelper();
  private _walkedCellSubject: Subject<void> = new Subject();
  private _walkedCell$ = this._walkedCellSubject.asObservable();

  public walkCell(cords: ICoordinates) {
    if (!this._isCellWalked(cords)) {
      this._visitedPaths.declareNodeAsVisited(cords.x, cords.y);
    } else {
      this._walkedCellSubject.next();
    }
  }

  public onCellWalked(): Observable<void> {
    return this._walkedCell$;
  }

  private _isCellWalked(cords: ICoordinates): boolean {
    return this._visitedPaths.isVertexVisited(cords.x, cords.y);
  }

  public clear(): void {
    this._visitedPaths = new VisitedNodesHelper();
  }
}

export default new WrongPathChecker();
