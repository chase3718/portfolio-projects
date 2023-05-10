import Ray from '../Ray';
import Surface from '../Surfaces';
import Vector3 from '../Vector3';
import Shape from './Shape';

export default class Sphere {
	private _center: Vector3;
	private _radius: number;
	private _surface: Surface;

	public get name(): string {
		return 'Sphere';
	}

	public get center(): Vector3 {
		return this._center;
	}

	public get radius(): number {
		return this._radius;
	}

	public get surface(): Surface {
		return this._surface;
	}

	public get radius2(): number {
		return this._radius * this._radius;
	}

	constructor(center: Vector3 | number[], radius: number, surface: Surface) {
		if (center instanceof Vector3) {
			this._center = center;
		} else {
			this._center = new Vector3(center[0], center[1], center[2]);
		}
		this._radius = radius;
		this._surface = surface;
	}

	public normal(pos: Vector3): Vector3 {
		return pos.minus(this._center).normalize();
	}

	public intersect(ray: Ray): number | null {
		let eo = this._center.minus(ray.start);
		let v = eo.dot(ray.direction);
		let dist = 0;
		if (v >= 0) {
			let disc = this.radius2 - (eo.dot(eo) - v * v);
			if (disc >= 0) {
				dist = v - Math.sqrt(disc);
			}
		}
		if (dist === 0) {
			return null;
		}
		return dist;
	}
}
