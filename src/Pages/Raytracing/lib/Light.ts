import Color from './Color';
import Vector3 from './Vector3';

export default class Light {
	private _position: Vector3;
	private _color: Color;

	get position(): Vector3 {
		return this._position;
	}

	get color(): Color {
		return this._color;
	}

	constructor(position: Vector3 | number[], color: Color | number[]) {
		if (position instanceof Vector3) {
			this._position = position;
		} else {
			this._position = new Vector3(position[0], position[1], position[2]);
		}
		if (color instanceof Color) {
			this._color = color;
		} else {
			this._color = new Color(color[0], color[1], color[2]);
		}
	}
}
