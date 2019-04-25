import { PIXEL_FIX } from '../maze-renderer/pixel_fix.constant';
import { TILE_SIZE } from '../maze-renderer/tile-size';

export class MainCanvasGenerator {
  private static ref: HTMLCanvasElement;

  public static generate(size: number): HTMLCanvasElement {
    const canvasElement: HTMLCanvasElement = self.document.createElement('canvas'),
      necessarySize: number = size * TILE_SIZE + (PIXEL_FIX * size);
    canvasElement.width = necessarySize;
    canvasElement.height = necessarySize;
    this.ref = canvasElement;
    const layerElement: HTMLDivElement = (self.document.querySelector('.layerContainer') as HTMLDivElement);
    layerElement.appendChild(canvasElement);
    layerElement.style.width = `${necessarySize}px`;
    layerElement.style.height = `${necessarySize}px`;

    return canvasElement;
  }

  public static remove(): void {
    if (this.ref) {
      const container: HTMLDivElement = (self.document.querySelector('.layerContainer') as HTMLDivElement);
      container.querySelectorAll('canvas').forEach((e: HTMLCanvasElement) => {
        container.removeChild(e)
      })
    }
  }
}