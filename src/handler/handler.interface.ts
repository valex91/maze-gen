import { Observable } from 'rxjs';
import { Directions } from '../movements/Movements.enum';

export interface IHandler {
  movements$(): Observable<Directions>;
}