import Vector3 from './Vector3';

export default class Camera {
	private _position: Vector3;
	private _forward: Vector3 = new Vector3(0, 0, -1);
	private _right: Vector3 = new Vector3(1, 0, 0);
	private _up: Vector3 = new Vector3(0, 1, 0);
	private _fov: number = 45;

	public get position(): Vector3 {
		return this._position;
	}

	public get forward(): Vector3 {
		return this._forward;
	}

	public get right(): Vector3 {
		return this._right;
	}

	public get up(): Vector3 {
		return this._up;
	}

	public get fov(): number {
		return this._fov;
	}

	constructor(position: Vector3 | number[], lookAt: Vector3 | number[] | null) {
		if (position instanceof Vector3) {
			this._position = position;
		} else {
			this._position = new Vector3(position[0], position[1], position[2]);
		}
		if (lookAt) {
			if (lookAt instanceof Vector3) {
				this._forward = this.lookAt(lookAt);
				this._right = Vector3.scale(Vector3.norm(Vector3.cross(this.forward, Vector3.down)), 1.5);
				this._up = Vector3.scale(Vector3.norm(Vector3.cross(this.forward, this.right)), 1.5);
			} else {
				this._forward = this.lookAt(new Vector3(lookAt[0], lookAt[1], lookAt[2]));
			}
		}
	}

	public lookAt(target: Vector3): Vector3 {
		let lookAt = Vector3.norm(Vector3.minus(this._position, target));
		return lookAt;
	}
}
