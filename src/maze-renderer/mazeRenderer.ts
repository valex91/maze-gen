import { CollisionDetectionFactory } from '../collision-detection-factory/collision-detection-factory';
import { CollisionDetection, IWall } from '../collision-detection/collision-detection';
import { GoalLayer } from '../goal-layer/goal-layer';
import { KeyboardHandler } from '../keyboard-handler/keyboard-handler';
import { Movements } from '../movements/movements';
import { PlayerLayer } from '../player-layer/player-layer';
import { Vertex } from '../vertex/vertex';
import { ICoordinates } from './coordinates.interface';
import { PIXEL_FIX } from './pixel_fix.constant';

export class MazeRenderer {
  private _context: CanvasRenderingContext2D;
  private readonly _y: number;
  private readonly _x: number;
  private readonly _collisionDetection: CollisionDetection;
  private _playerLayer: PlayerLayer;
  private readonly _startingPoint: number;
  private _goalLayer: GoalLayer;

  constructor(canvas: HTMLCanvasElement, xSize: number, ySize: number) {
    this._context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this._x = xSize;
    this._y = ySize;
    this._collisionDetection = CollisionDetectionFactory.create();
    this._playerLayer = PlayerLayer.create(canvas, 20,
      new Movements(
        new KeyboardHandler()
      )
    );

    this._goalLayer = GoalLayer.create(canvas, 20);
    const size: number = xSize * ySize;
    this._startingPoint = Math.floor((Math.random() * size));
  }

  public render(graphAdjacencyList: Array<Vertex>): void {
    const startingPoint: number = this._generateRandomIndex(),
      goal: number = this._generateRandomIndex();

    for (let i = 0; i < this._x; i++) {
      for (let j = 0; j < this._y; j++) {
        const scaledCoordinates: ICoordinates = { x: 20 * j, y: 20 * i };

        const codedIndex: number = parseInt(i.toString() + j.toString());
        if (codedIndex === startingPoint) {
          this._playerLayer.init(scaledCoordinates);
        }

        if (codedIndex === goal) {
          this._goalLayer.init(scaledCoordinates);
        }
        this._renderCell(scaledCoordinates, graphAdjacencyList[codedIndex].getEdges(), 20)
      }
    }
  }

  private _renderCell(coords: ICoordinates, cellWalls: Array<number>, size: number) {
    cellWalls.forEach((w: number, index: number) => {
      this._context.beginPath();
      this._adjustedMoveTo(coords.x, coords.y);
      switch (index) {
        case 0:
          this._adjustedMoveTo(coords.x, coords.y);
          if (w !== -1) {
            this._adjustedLineTo(coords.x + size, coords.y);
            this._registerWall({
              startingPoint: { x: coords.x, y: coords.y },
              endingPoint: { x: coords.x + size, y: coords.y }
            })
          }
          break;
        case 1:
          this._adjustedMoveTo(coords.x + size, coords.y);
          if (w !== -1) {
            this._adjustedLineTo(coords.x + size, coords.y + size);
            this._registerWall(
              {
                startingPoint: { x: coords.x + size, y: coords.y },
                endingPoint: { x: coords.x + size, y: coords.y + size }
              }
            )
          }
          break;
        case 2:
          this._adjustedMoveTo(coords.x + size, coords.y + size);
          if (w !== -1) {
            this._adjustedLineTo(coords.x, coords.y + size);
            this._registerWall({
              startingPoint: { x: coords.x + size, y: coords.y + size },
              endingPoint: { x: coords.x + size, y: coords.y + size }
            })
          }
          break;
        case 3:
          this._adjustedMoveTo(coords.x, coords.y + size);
          if (w !== -1) {
            this._adjustedLineTo(coords.x, coords.y);
            this._registerWall({
              startingPoint: { x: coords.x, y: coords.y + size },
              endingPoint: { x: coords.x, y: coords.y }
            })
          }
          break;
      }

      this._context.closePath();
      this._context.stroke();
    });
  }

  private _adjustedMoveTo(x: number, y: number): void {
    this._context.moveTo(x + PIXEL_FIX, y + PIXEL_FIX);
  }

  private _generateRandomIndex(): number {
    const randomFromX = Math.floor(Math.random() * this._x * 71) % this._x;
    const randomFromY = Math.floor(Math.random() * this._y * 31) % this._y;

    return parseInt(randomFromX.toString() + randomFromY.toString());
  }

  private _adjustedLineTo(x: number, y: number): void {
    this._context.lineTo(x + PIXEL_FIX, y + PIXEL_FIX);
  }

  private _registerWall(wall: Pick<IWall, 'startingPoint' | 'endingPoint'>): void {
    this._collisionDetection.registerWall({
      startingPoint: {
        x: wall.startingPoint.x + PIXEL_FIX,
        y: wall.startingPoint.y + PIXEL_FIX
      },
      endingPoint: {
        x: wall.endingPoint.x + PIXEL_FIX,
        y: wall.endingPoint.y + PIXEL_FIX
      },
      width: 1
    })
  }
}