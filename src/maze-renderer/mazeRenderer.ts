import { inject } from 'inversion-box'
import { CollisionDetection } from '../collision-detection/collision-detection';
import { GoalLayer } from '../goal-layer/goal-layer';
import { IVertexLocation } from '../graph/graph';
import { KeyboardHandler } from '../keyboard-handler/keyboard-handler';
import { MainCanvasGenerator } from '../main-canvas-generator/main-canvas-generator';
import { Movements } from '../movements/movements';
import { PlayerLayer } from '../player-layer/player-layer';
import { Vertex } from '../vertex/vertex';
import { ICoordinates } from './coordinates.interface';
import { PIXEL_FIX } from './pixel_fix.constant';
import { TILE_SIZE } from './tile-size';

export class MazeRenderer {
  private _context: CanvasRenderingContext2D;
  private readonly _collisionDetection: CollisionDetection;
  private _playerLayer: PlayerLayer;
  private readonly _startingPoint: number;
  private _goalLayer: GoalLayer;
  private readonly _size: number;
  private readonly _movements: Movements;

  constructor(size: number) {
    const mainCanvas: HTMLCanvasElement = MainCanvasGenerator.generate(size);
    this._context = mainCanvas.getContext('2d') as CanvasRenderingContext2D;
    this._size = size;
    this._collisionDetection = inject(CollisionDetection);
    this._movements = new Movements(new KeyboardHandler());
    this._playerLayer = PlayerLayer.create(mainCanvas, TILE_SIZE, this._movements);

    this._goalLayer = GoalLayer.create(mainCanvas, TILE_SIZE);
    const mazeSize: number = this._size * this._size;
    this._startingPoint = Math.floor((Math.random() * 599) % mazeSize);
  }

  public render(graphAdjacencyList: Array<Array<Vertex>>): void {
    const startingPoint: number = this._generateRandomIndex(),
      goal: number = this._generateRandomIndex();

    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        const scaledCoordinates: ICoordinates = { x: TILE_SIZE * j, y: TILE_SIZE * i };

        const codedIndex: number = parseInt(i.toString() + j.toString());
        if (codedIndex === startingPoint) {
          this._playerLayer.init(scaledCoordinates);
        }

        if (codedIndex === goal) {
          this._goalLayer.init(scaledCoordinates);
        }
        this._collisionDetection.registerCellBoundaries(scaledCoordinates, graphAdjacencyList[i][j].getEdges());
        this._renderCell(scaledCoordinates, graphAdjacencyList[i][j].getEdges(), TILE_SIZE)
      }
    }
  }

  public clearRender(): void {
    this._movements.clear();
    this._playerLayer.clear();
    this._goalLayer.clear();
  }

  private _renderCell(coords: ICoordinates, cellWalls: Array<IVertexLocation | -1>, size: number) {
    cellWalls.forEach((w: IVertexLocation | -1, index: number) => {
      this._context.beginPath();
      this._adjustedMoveTo(coords.x, coords.y);
      switch (index) {
        case 0:
          this._adjustedMoveTo(coords.x, coords.y);
          if (w !== -1) {
            this._adjustedLineTo(coords.x + size, coords.y);
          }
          break;
        case 1:
          this._adjustedMoveTo(coords.x + size, coords.y);
          if (w !== -1) {
            this._adjustedLineTo(coords.x + size, coords.y + size);
          }
          break;
        case 2:
          this._adjustedMoveTo(coords.x + size, coords.y + size);
          if (w !== -1) {
            this._adjustedLineTo(coords.x, coords.y + size);
          }
          break;
        case 3:
          this._adjustedMoveTo(coords.x, coords.y + size);
          if (w !== -1) {
            this._adjustedLineTo(coords.x, coords.y);
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
    const randomFromX = Math.floor(Math.random() * this._size * 71) % this._size;
    const randomFromY = Math.floor(Math.random() * this._size * 31) % this._size;

    return parseInt(randomFromX.toString() + randomFromY.toString());
  }

  private _adjustedLineTo(x: number, y: number): void {
    this._context.lineTo(x + PIXEL_FIX, y + PIXEL_FIX);
  }
}