import { CollisionDetection } from '../collision-detection/collision-detection';

export class CollisionDetectionFactory {
  public static create(): CollisionDetection {
    return new CollisionDetection()
  }
}