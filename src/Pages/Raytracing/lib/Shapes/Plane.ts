import Ray from '../Ray';
import Surface from '../Surfaces';
import Vector3 from '../Vector3';
import Shape from './Shape';

export default class Plane {
	private _normal: Vector3;
	private _surface: Surface;
	private _offset: number;

	public get name(): string {
		return 'Plane';
	}

	get surface(): Surface {
		return this._surface;
	}

	get offset(): number {
		return this._offset;
	}

	constructor(normal: Vector3 | number[], surface: Surface, offset: number = 0) {
		if (normal instanceof Vector3) {
			this._normal = normal;
		} else {
			this._normal = new Vector3(normal[0], normal[1], normal[2]);
		}
		this._surface = surface;
		this._offset = offset;
	}

	public intersect(ray: Ray): number | null {
		let denom = this._normal.dot(ray.direction);
		if (denom >= 0) {
			return null;
		} else {
			let dist = (this._normal.dot(ray.start) + this.offset) / -denom;
			return dist;
		}
	}

	public normal(pos: Vector3): Vector3 {
		return this._normal;
	}
}
