import Ray from './Ray';
import Surfaces from './Surfaces';
import Vector3 from './Vector3';

export default class Plane {
	public norm: Vector3;
	public distance: number;
	public surface: any;

	constructor(normal: Vector3, distance: number, surface: any = Surfaces.checkerboard) {
		this.surface = surface;
		this.norm = normal;
		this.distance = distance;
		this.surface = surface;
	}

	public normal(point: Vector3): Vector3 {
		return this.norm;
	}

	public intersect(ray: Ray): number {
		const denom: number = this.norm.dot(ray.direction);
		if (denom < 0) return Infinity;
		return (this.norm.dot(ray.origin) + this.distance) / denom;
	}
}
