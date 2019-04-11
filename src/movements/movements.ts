import { merge, Observable } from 'rxjs';
import { IHandler } from '../handler/handler.interface';
import { Directions } from './Movements.enum';

export class Movements {
  private readonly _movements: Observable<Directions>;

  constructor(...handlers: Array<IHandler>) {
    this._movements = merge(...handlers.map((handler: IHandler) => handler.movements$()));
  }

  public movementsStream(): Observable<Directions> {
    return this._movements;
  }
}