import Vector3 from './Vector3';

export default class Camera {
	public position: Vector3;
	public up: Vector3;
	public right: Vector3;
	public forward: Vector3;
	public rotation: Vector3;
	public fov: number;
	public aspectRatio: number;
	public near: number;
	public far: number;
	constructor(
		position: Vector3,
		rotation: Vector3,
		fov: number = 95,
		aspectRatio: number = 16 / 9,
		near: number = 1,
		far: number = 1000
	) {
		this.position = position;
		this.rotation = rotation;
		this.fov = fov;
		this.aspectRatio = aspectRatio;
		this.near = near;
		this.far = far;
		this.up = new Vector3(0, 1, 0);
		this.right = new Vector3(1, 0, 0);
		this.forward = new Vector3(0, 0, 1);
	}
}
