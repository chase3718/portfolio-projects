import Vector3 from './Vector3';

export default class Quaternion {
	public x: number;
	public y: number;
	public z: number;
	public w: number;

	constructor(x: number, y: number, z: number, w: number) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	public times(k: number): Quaternion {
		return new Quaternion(this.x * k, this.y * k, this.z * k, this.w * k);
	}

	public multiply(v: Quaternion): Quaternion {
		return new Quaternion(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w);
	}

	public plus(v: Quaternion): Quaternion {
		return new Quaternion(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
	}

	public minus(v: Quaternion): Quaternion {
		return new Quaternion(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
	}

	public divide(k: number): Quaternion {
		return new Quaternion(this.x / k, this.y / k, this.z / k, this.w / k);
	}

	public dot(v: Quaternion): number {
		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	}

	public mag(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}

	public norm(): Quaternion {
		const mag = this.mag();
		const div = mag === 0 ? Infinity : 1.0 / mag;
		return this.times(div);
	}

	public set(x: number, y: number, z: number, w: number): Quaternion {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
		return this;
	}

	public static fromToRotation(from: Vector3, to: Vector3): Vector3 {
		const v = from.cross(to);
		const q = new Quaternion(v.x, v.y, v.z, 1 + from.dot(to));
		return q.norm().toEuler();
	}

	public setLookRotation(forward: Vector3, up: Vector3): Quaternion {
		const z = forward.norm();
		const x = up.cross(z).norm();
		const y = z.cross(x).norm();
		const m00 = x.x;
		const m01 = x.y;
		const m02 = x.z;
		const m10 = y.x;
		const m11 = y.y;
		const m12 = y.z;
		const m20 = z.x;
		const m21 = z.y;
		const m22 = z.z;
		const num8 = m00 + m11 + m22;
		if (num8 > 0) {
			const num = Math.sqrt(num8 + 1);
			this.w = num * 0.5;
			const num2 = 0.5 / num;
			this.x = (m12 - m21) * num2;
			this.y = (m20 - m02) * num2;
			this.z = (m01 - m10) * num2;
			return this;
		}
		if (m00 >= m11 && m00 >= m22) {
			const num7 = Math.sqrt(1 + m00 - m11 - m22);
			const num4 = 0.5 / num7;
			this.x = 0.5 * num7;
			this.y = (m01 + m10) * num4;
			this.z = (m02 + m20) * num4;
			this.w = (m12 - m21) * num4;
			return this;
		}
		if (m11 > m22) {
			const num6 = Math.sqrt(1 + m11 - m00 - m22);
			const num3 = 0.5 / num6;
			this.x = (m10 + m01) * num3;
			this.y = 0.5 * num6;
			this.z = (m21 + m12) * num3;
			this.w = (m20 - m02) * num3;
			return this;
		}
		const num5 = Math.sqrt(1 + m22 - m00 - m11);
		const num2 = 0.5 / num5;
		this.x = (m20 + m02) * num2;
		this.y = (m21 + m12) * num2;
		this.z = 0.5 * num5;
		this.w = (m01 - m10) * num2;
		return this;
	}

	public toAngleAxis(): { angle: number; axis: Vector3 } {
		const angle = 2 * Math.acos(this.w);
		const s = Math.sqrt(1 - this.w * this.w);
		const axis = s < 0.001 ? new Vector3(this.x, this.y, this.z) : new Vector3(this.x / s, this.y / s, this.z / s);
		return { angle, axis };
	}

	public toEuler(): Vector3 {
		const sqw = this.w * this.w;
		const sqx = this.x * this.x;
		const sqy = this.y * this.y;
		const sqz = this.z * this.z;
		const unit = sqx + sqy + sqz + sqw;
		const test = this.x * this.y + this.z * this.w;
		const heading =
			test > 0.499 * unit
				? 2 * Math.atan2(this.x, this.w)
				: test < -0.499 * unit
				? -2 * Math.atan2(this.x, this.w)
				: Math.atan2(2 * this.y * this.w - 2 * this.x * this.z, sqx - sqy - sqz + sqw);
		const attitude = Math.asin((2 * test) / unit);
		const bank = Math.atan2(2 * this.x * this.w - 2 * this.y * this.z, -sqx + sqy - sqz + sqw);
		return new Vector3(bank, heading, attitude);
	}

	public angle(other: Quaternion): number {
		const dot = this.dot(other);
		return Math.acos(2 * dot * dot - 1);
	}

	public clampMagnitude(maxLength: number): Quaternion {
		const length = this.length();
		if (length > maxLength) {
			return this.scale(maxLength / length);
		}
		return this;
	}

	public length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}

	public scale(scale: number): Quaternion {
		this.x *= scale;
		this.y *= scale;
		this.z *= scale;
		this.w *= scale;
		return this;
	}

	public static fromAxisAngle(axis: Vector3, angle: number): Quaternion {
		const halfAngle = angle / 2;
		const sin = Math.sin(halfAngle);
		return new Quaternion(axis.x * sin, axis.y * sin, axis.z * sin, Math.cos(halfAngle));
	}
}
