import Quaternion from './Quaternion';

export default class Vector3 {
	public x: number;
	public y: number;
	public z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public times(k: number): Vector3 {
		return new Vector3(this.x * k, this.y * k, this.z * k);
	}

	public multiply(v: Vector3): Vector3 {
		return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
	}

	public plus(v: Vector3): Vector3 {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	public minus(v: Vector3): Vector3 {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	public divide(k: number): Vector3 {
		return new Vector3(this.x / k, this.y / k, this.z / k);
	}

	public dot(v: Vector3): number {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	public mag(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	public norm(): Vector3 {
		const mag = this.mag();
		const div = mag === 0 ? Infinity : 1.0 / mag;
		return this.times(div);
	}

	public cross(v: Vector3): Vector3 {
		return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	}

	public angle(v: Vector3): number {
		return Math.acos(this.dot(v) / (this.mag() * v.mag()));
	}

	public clampMagnitude(maxLength: number): Vector3 {
		const sqrMagnitude = this.dot(this);
		if (sqrMagnitude > maxLength * maxLength) {
			const div = maxLength / Math.sqrt(sqrMagnitude);
			return this.times(div);
		}
		return this;
	}

	public distanceTo(v: Vector3): number {
		return Math.sqrt(this.distanceToSquared(v));
	}

	public distanceToSquared(v: Vector3): number {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		const dz = this.z - v.z;
		return dx * dx + dy * dy + dz * dz;
	}

	public lerp(v: Vector3, alpha: number): Vector3 {
		return new Vector3(
			this.x + (v.x - this.x) * alpha,
			this.y + (v.y - this.y) * alpha,
			this.z + (v.z - this.z) * alpha
		);
	}

	public equals(v: Vector3): boolean {
		return this.x === v.x && this.y === v.y && this.z === v.z;
	}

	public max(v: Vector3): Vector3 {
		return new Vector3(Math.max(this.x, v.x), Math.max(this.y, v.y), Math.max(this.z, v.z));
	}

	public min(v: Vector3): Vector3 {
		return new Vector3(Math.min(this.x, v.x), Math.min(this.y, v.y), Math.min(this.z, v.z));
	}

	public moveTowards(target: Vector3, maxDistanceDelta: number): Vector3 {
		const a = target.minus(this);
		const magnitude = a.mag();
		if (magnitude <= maxDistanceDelta || magnitude === 0) {
			return target;
		}
		return this.plus(a.divide(magnitude).times(maxDistanceDelta));
	}

	public reflect(inNormal: Vector3): Vector3 {
		return this.minus(inNormal.times(2 * this.dot(inNormal)));
	}

	public rotateTowards(target: Vector3, maxRadiansDelta: number, maxMagnitudeDelta: number): Vector3 {
		const a = this.angle(target);
		if (a === 0) {
			return target;
		}
		const num = Math.min(1, maxRadiansDelta / a);
		return Quaternion.fromToRotation(this, target.times(num)).multiply(this).clampMagnitude(maxMagnitudeDelta);
	}

	public orthogonal(v: Vector3): Vector3 {
		return this.minus(this.project(v));
	}

	public static orthogonal(v: Vector3): Vector3 {
		return v.minus(v.project(Vector3.forward()));
	}

	public project(v: Vector3): Vector3 {
		const sqrMag = v.dot(v);
		if (sqrMag === 0) {
			return Vector3.zero();
		}
		const dot = this.dot(v);
		return v.times(dot / sqrMag);
	}

	public static forward(): Vector3 {
		return new Vector3(0, 0, 1);
	}

	public static back(): Vector3 {
		return new Vector3(0, 0, -1);
	}

	public static right(): Vector3 {
		return new Vector3(1, 0, 0);
	}

	public static left(): Vector3 {
		return new Vector3(-1, 0, 0);
	}

	public static up(): Vector3 {
		return new Vector3(0, 1, 0);
	}

	public static down(): Vector3 {
		return new Vector3(0, -1, 0);
	}

	public static negativeInfinity(): Vector3 {
		return new Vector3(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
	}

	public static positiveInfinity(): Vector3 {
		return new Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
	}

	public static zero(): Vector3 {
		return new Vector3(0, 0, 0);
	}

	public static one(): Vector3 {
		return new Vector3(1, 1, 1);
	}
}
