import { Subject } from 'rxjs';

export class GameService {
  private _iterationsSubject: Subject<void> = new Subject<void>();

  onIteration(toExecute: Function): void {
    this._iterationsSubject.asObservable().subscribe(() => {
      toExecute();
    })
  }

  public next(): void {
    this._iterationsSubject.next();
  }
}

export default new GameService();