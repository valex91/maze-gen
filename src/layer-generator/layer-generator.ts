export abstract class LayerGenerator {
  protected _context: CanvasRenderingContext2D;

  protected constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener('unload', () => alert('removed'));
    const layerCanvasElement = document.createElement('canvas');
    layerCanvasElement.height = canvas.height;
    layerCanvasElement.width = canvas.width;
    (document.querySelector('.layerContainer') as HTMLElement).appendChild(layerCanvasElement);
    this._context = layerCanvasElement.getContext('2d') as CanvasRenderingContext2D;
  }

  public abstract init(...args: Array<any>): unknown
}