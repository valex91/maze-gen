import { Vertex } from '../vertex/vertex';

export class Renderer {
  private _context: CanvasRenderingContext2D;
  private _y: number;
  private _x: number;

  constructor(canvas: HTMLCanvasElement, xSize: number, ySize: number) {
    this._context = canvas.getContext('2d') as CanvasRenderingContext2D;
    this._x = xSize;
    this._y = ySize
  }


  public render(graphAdjacencyList: Array<Vertex>): void {
    for (let i = 0; i < this._x; i++) {
      for (let j = 0; j < this._y; j++) {
        const codedIndex: number = parseInt(i.toString() + j.toString());
        this._renderCell({ x: 20 * j, y: 20 * i }, graphAdjacencyList[codedIndex].getEdges(), 20)
      }
    }
  }


  private _renderCell(coords: Record<'x' | 'y', number>, cellWalls: Array<number>, size: number) {
    cellWalls.forEach((w: number, index: number) => {
      this._context.beginPath();
      this._context.moveTo(coords.x, coords.y);
      switch (index) {
        case 0:
          this._context.moveTo(coords.x, coords.y);
          (w !== -1) ? this._context.lineTo(coords.x + size, coords.y) : null;
          break;
        case 1:
          this._context.moveTo(coords.x + size, coords.y);
          (w !== -1) ? this._context.lineTo(coords.x + size, coords.y + size) : null;
          break;
        case 2:
          this._context.moveTo(coords.x + size, coords.y + size);
          (w !== -1) ? this._context.lineTo(coords.x, coords.y + size) : null;
          break;
        case 3:
          this._context.moveTo(coords.x, coords.y + size);
          (w !== -1) ? this._context.lineTo(coords.x, coords.y - size) : this._context.moveTo(coords.x, coords.y - size);
          break;
      }

      this._context.closePath();
      this._context.stroke();
    });
  }
}