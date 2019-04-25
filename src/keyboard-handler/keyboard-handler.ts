import { Observable, Subject } from 'rxjs';
import { IHandler } from '../handler/handler.interface';
import { Directions } from '../movements/Movements.enum';
import { Keys } from './keys';

export class KeyboardHandler implements IHandler {
  private _movementSubject: Subject<Directions> = new Subject<Directions>();
  private readonly _bindedHandler: (e: KeyboardEvent) => void;

  constructor() {
    this._bindedHandler = this._handleMovement.bind(this);
    self.addEventListener('keydown', this._bindedHandler)
  }

  public movements$(): Observable<Directions> {
    return this._movementSubject.asObservable();
  }

  public clear() {
    self.removeEventListener('keydown', this._bindedHandler);
  }

  private _handleMovement(event: KeyboardEvent): void {
    switch (event.key) {
      case Keys.ArrowDown:
      case Keys.Down:
        this._movementSubject.next(Directions.Down);
        break;

      case Keys.ArrowUp:
      case Keys.Up:
        this._movementSubject.next(Directions.Up);
        break;

      case Keys.ArrowLeft:
      case Keys.Left:
        this._movementSubject.next(Directions.Left);
        break;

      case Keys.ArrowRight:
      case Keys.Right:
        this._movementSubject.next(Directions.Right);
        break;
    }
  }
}