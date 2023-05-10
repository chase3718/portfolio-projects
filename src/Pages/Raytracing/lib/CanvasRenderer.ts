import Camera from './Camera';
import Color from './Color';
import Ray from './Ray';
import RayTracer from './RayTracer';
import Scene from './Scene';
import Vector3 from './Vector3';

const rt = new RayTracer();

export default class CanvasRenderer {
	private _canvas: HTMLCanvasElement;
	private _ctx: CanvasRenderingContext2D;
	private _width: number;
	private _height: number;
	private _rendering: (rendering: boolean) => void;

	constructor(canvas: HTMLCanvasElement, rendering: (rendering: boolean) => void) {
		this._canvas = canvas;
		this._ctx = canvas.getContext('2d')!;
		this._width = canvas.width;
		this._height = canvas.height;
		this._rendering = rendering;
	}

	public clear(): void {
		this._ctx.clearRect(0, 0, this._width, this._height);
	}

	public drawPixel(x: number, y: number, color: Color): void {
		this._ctx.fillStyle = color.toString();
		this._ctx.fillRect(x, y, 1, 1);
	}

	public renderScene(scene: Scene): void {
		this._rendering(true);

		//Get ray direction starting at camera position and going through pixel (x, y) using the camera's field of view and forward direction
		let getRayDirection = (x: number, y: number, camera: Camera): Vector3 => {
			let fov = (camera.fov * Math.PI) / 180;
			let aspectRatio = this._width / this._height;
			let px = ((2 * (x + 0.5)) / this._width - 1) * Math.tan(fov / 2) * aspectRatio;
			let py = (1 - (2 * (y + 0.5)) / this._height) * Math.tan(fov / 2);
			let dir = Vector3.norm(
				Vector3.plus(Vector3.scale(camera.right, px), Vector3.plus(Vector3.scale(camera.up, py), camera.forward))
			);
			return dir;
		};

		this.clear();
		for (let x = 0; x < this._width; x++) {
			for (let y = 0; y < this._height; y++) {
				let dir = getRayDirection(x, y, scene.camera!);
				let ray = new Ray(scene.camera!.position, dir);
				let color = rt.traceRay(ray, scene);
				this.drawPixel(x, y, color);
			}
		}
		this._rendering(false);
	}
}
