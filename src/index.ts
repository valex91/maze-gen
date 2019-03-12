import { GridCreator } from './grid-creator/grid-creator';
let canvas: HTMLCanvasElement = document.querySelector('.renderCanvas') as HTMLCanvasElement;
new GridCreator(5, 5, canvas);
