import Vector3 from './Vector3';

export default class Ray {
	public origin: Vector3;
	public direction: Vector3;
	public distance: number = Infinity;
	constructor(origin: Vector3, direction: Vector3, distance: number = Infinity) {
		this.origin = origin;
		this.direction = direction;
		this.distance = distance;
	}
}
