import Color from './Color';
import Vector3 from './Vector3';

export default class Surface {
	private _diffuse: (pos: Vector3) => Color;
	private _specular: (pos: Vector3) => Color;
	private _reflect: (pos: Vector3) => number;
	private _roughness: number;

	public get diffuse(): (pos: Vector3) => Color {
		return this._diffuse;
	}

	public get specular(): (pos: Vector3) => Color {
		return this._specular;
	}

	public get reflect(): (pos: Vector3) => number {
		return this._reflect;
	}

	public get roughness(): number {
		return this._roughness;
	}

	constructor(
		diffuse: (pos: Vector3) => Color,
		specular: (pos: Vector3) => Color,
		reflect: (pos: Vector3) => number,
		roughness: number
	) {
		this._diffuse = diffuse;
		this._specular = specular;
		this._reflect = reflect;
		this._roughness = Math.max(0, roughness);
	}

	public static readonly shiny: Surface = new Surface(
		(pos: Vector3) => Color.white,
		(pos: Vector3) => Color.gray,
		(pos: Vector3) => 0.7,
		250
	);
	public static readonly checkerboard: Surface = new Surface(
		(pos: Vector3) => ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 ? Color.white : Color.black),
		(pos: Vector3) => Color.white,
		(pos: Vector3) => ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 ? 0.1 : 0.7),
		150
	);
}
