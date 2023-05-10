import Vector3 from './Vector3';

export default class Ray {
	private _start;
	private _direction;

	get start(): Vector3 {
		return this._start;
	}

	get direction(): Vector3 {
		return this._direction;
	}

	constructor(start: Vector3 | number[], direction: Vector3 | number[]) {
		if (start instanceof Vector3) {
			this._start = start;
		} else {
			this._start = new Vector3(start[0], start[1], start[2]);
		}
		if (direction instanceof Vector3) {
			this._direction = direction;
		} else {
			this._direction = new Vector3(direction[0], direction[1], direction[2]);
		}
	}

	public getPoint(dist: number): Vector3 {
		return this._start.plus(this._direction.scale(dist));
	}
}
