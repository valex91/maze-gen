import { GridCreator } from './grid-creator/grid-creator';
let canvas: HTMLCanvasElement = document.querySelector('.renderCanvas') as HTMLCanvasElement;
new GridCreator(10,10, canvas);

