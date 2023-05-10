export default class Vector3 {
	private _x: number;
	private _y: number;
	private _z: number;

	public get x(): number {
		return this._x;
	}

	public get y(): number {
		return this._y;
	}

	public get z(): number {
		return this._z;
	}

	public get magnitude(): number {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
	}

	public get mag(): number {
		return this.magnitude;
	}

	constructor(x: number, y: number, z: number) {
		this._x = x;
		this._y = y;
		this._z = z;
	}

	public plus(v: Vector3): Vector3 {
		return new Vector3(this._x + v.x, this._y + v.y, this._z + v.z);
	}

	public minus(v: Vector3): Vector3 {
		return new Vector3(this._x - v.x, this._y - v.y, this._z - v.z);
	}

	public scale(s: number): Vector3 {
		return new Vector3(this._x * s, this._y * s, this._z * s);
	}

	public times(v: Vector3): Vector3 {
		return new Vector3(this._x * v.x, this._y * v.y, this._z * v.z);
	}

	public dot(v: Vector3): number {
		return this._x * v.x + this._y * v.y + this._z * v.z;
	}

	public cross(v: Vector3): Vector3 {
		return new Vector3(this._y * v.z - this._z * v.y, this._z * v.x - this._x * v.z, this._x * v.y - this._y * v.x);
	}

	public normalize(): Vector3 {
		const mag = this.magnitude;
		const div = mag === 0 ? Number.POSITIVE_INFINITY : 1.0 / mag;
		return new Vector3(this._x * div, this._y * div, this._z * div);
	}

	public rotateX(angle: number): Vector3 {
		const rad = (angle * Math.PI) / 180;
		const cosa = Math.cos(rad);
		const sina = Math.sin(rad);
		return new Vector3(this._x, this._y * cosa - this._z * sina, this._y * sina + this._z * cosa);
	}

	public rotateY(angle: number): Vector3 {
		const rad = (angle * Math.PI) / 180;
		const cosa = Math.cos(rad);
		const sina = Math.sin(rad);
		return new Vector3(this._x * cosa + this._z * sina, this._y, -this._x * sina + this._z * cosa);
	}

	public rotateZ(angle: number): Vector3 {
		const rad = (angle * Math.PI) / 180;
		const cosa = Math.cos(rad);
		const sina = Math.sin(rad);
		return new Vector3(this._x * cosa - this._y * sina, this._x * sina + this._y * cosa, this._z);
	}

	public rotate(rot: Vector3): Vector3 {
		return this.rotateX(rot.x).rotateY(rot.y).rotateZ(rot.z);
	}

	public static plus(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
	}

	public static minus(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
	}

	public static scale(v: Vector3, s: number): Vector3 {
		return new Vector3(v.x * s, v.y * s, v.z * s);
	}

	public static times(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
	}

	public static dot(v1: Vector3, v2: Vector3): number {
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}

	public static cross(v1: Vector3, v2: Vector3): Vector3 {
		return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
	}

	public static norm(v: Vector3): Vector3 {
		const mag = v.magnitude;
		const div = mag === 0 ? Number.POSITIVE_INFINITY : 1.0 / mag;
		return new Vector3(v.x * div, v.y * div, v.z * div);
	}

	public static readonly zero = new Vector3(0, 0, 0);
	public static readonly one = new Vector3(1, 1, 1);
	public static readonly right = new Vector3(1, 0, 0);
	public static readonly left = new Vector3(-1, 0, 0);
	public static readonly up = new Vector3(0, 1, 0);
	public static readonly down = new Vector3(0, -1, 0);
	public static readonly forward = new Vector3(0, 0, 1);
	public static readonly backward = new Vector3(0, 0, -1);
	public static readonly positiveInfinity = new Vector3(
		Number.POSITIVE_INFINITY,
		Number.POSITIVE_INFINITY,
		Number.POSITIVE_INFINITY
	);
	public static readonly negativeInfinity = new Vector3(
		Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY,
		Number.NEGATIVE_INFINITY
	);
}
