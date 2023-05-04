import Ray from './Ray';
import surfaces from './Surfaces';
import Vector3 from './Vector3';

export default class Sphere {
	public position: Vector3;
	public radius: number;
	public radius2: number;
	public surface: any;
	constructor(position: Vector3, radius: number, surface: any = surfaces.shiny) {
		this.position = position;
		this.radius = radius;
		this.radius2 = radius * radius;
		this.surface = surface;
	}

	public normal(point: Vector3): Vector3 {
		return point.minus(this.position).norm();
	}

	public intersect(ray: Ray): number | null {
		// var eo = Vector.minus(this.center, ray.start);
		var eo = this.position.minus(ray.origin);
		// var v = Vector.dot(eo, ray.dir);
		var v = eo.dot(ray.direction);
		var dist = 0;
		if (v >= 0) {
			var disc = this.radius2 - (eo.dot(eo) - v * v);
			console.log(disc);
			if (disc >= 0) {
				dist = v - Math.sqrt(disc);
			}
		}
		if (dist === 0) {
			return null;
		} else {
			return dist;
		}
	}
}
