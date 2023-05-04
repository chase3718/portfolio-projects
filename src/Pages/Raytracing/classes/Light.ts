import Color from './Color';
import Vector3 from './Vector3';

export default class Light {
	public position: Vector3;
	public color: Color;
	public intensity: number;
	constructor(position: Vector3, color: Color = Color.White(), intensity: number = 10) {
		this.position = position;
		this.color = color;
		this.intensity = intensity;
	}
}
