import Camera from './Camera';
import Color from './Color';
import Light from './Light';
import Plane from './Shapes/Plane';
import Shape from './Shapes/Shape';
import Sphere from './Shapes/Sphere';

export default class Scene {
	private _objects: (Sphere | Plane)[] | null;
	private _lights: Light[] | null;
	private _camera: Camera | null;
	private _background: Color;

	get objects() {
		return this._objects;
	}

	get lights() {
		return this._lights;
	}

	get camera() {
		return this._camera;
	}

	get background() {
		return this._background;
	}

	constructor(
		objects: (Sphere | Plane)[] | null = null,
		lights: Light[] | null = null,
		camera: Camera | null = null,
		background: Color = Color.black
	) {
		this._objects = objects;
		this._lights = lights;
		this._camera = camera;
		this._background = background;
	}

	public addObject(object: Sphere | Plane) {
		if (this._objects === null) {
			this._objects = [];
		}
		this._objects.push(object);
	}

	public addLight(light: Light) {
		if (this._lights === null) {
			this._lights = [];
		}
		this._lights.push(light);
	}

	public setCamera(camera: Camera) {
		this._camera = camera;
	}
}
