export default class Color {
	private _r: number;
	private _g: number;
	private _b: number;

	public get r(): number {
		return this._r;
	}

	public get g(): number {
		return this._g;
	}

	public get b(): number {
		return this._b;
	}

	public get hex(): string {
		return Color.toHex(this);
	}

	constructor(r: number, g: number, b: number) {
		this._r = Math.min(255, Math.max(0, r));
		this._g = Math.min(255, Math.max(0, g));
		this._b = Math.min(255, Math.max(0, b));
	}

	public scale(k: number): Color {
		this._r *= k;
		this._g *= k;
		this._b *= k;
		this.clamp();
		return this;
	}

	public static scale(v: Color, k: number): Color {
		return new Color(v.r * k, v.g * k, v.b * k).clamp();
	}

	public plus(v: Color): Color {
		this._r += v.r;
		this._g += v.g;
		this._b += v.b;
		this.clamp();
		return this;
	}

	public static plus(v1: Color, v2: Color): Color {
		let r = (Number.isNaN(v1.r) ? 0 : v1.r) + (Number.isNaN(v2.r) ? 0 : v2.r);
		let g = (Number.isNaN(v1.g) ? 0 : v1.g) + (Number.isNaN(v2.g) ? 0 : v2.g);
		let b = (Number.isNaN(v1.b) ? 0 : v1.b) + (Number.isNaN(v2.b) ? 0 : v2.b);
		return new Color(r, g, b).clamp();
	}

	public times(v: Color): Color {
		this._r *= v.r;
		this._g *= v.g;
		this._b *= v.b;
		this.clamp();
		return this;
	}

	public static times(v1: Color, v2: Color): Color {
		let r = (Number.isNaN(v1.r) ? 0 : v1.r) * (Number.isNaN(v2.r) ? 0 : v2.r);
		let g = (Number.isNaN(v1.g) ? 0 : v1.g) * (Number.isNaN(v2.g) ? 0 : v2.g);
		let b = (Number.isNaN(v1.b) ? 0 : v1.b) * (Number.isNaN(v2.b) ? 0 : v2.b);
		return new Color(r, g, b).clamp();
	}

	public static toHex(v: Color): string {
		return '#' + v.r.toString(16) + v.g.toString(16) + v.b.toString(16);
	}

	public static fromHex(hex: string): Color {
		if (hex.length === 4) {
			hex = hex.replace(/([^#])/g, '$1$1');
		}
		return new Color(
			parseInt(hex.substring(1, 2), 16),
			parseInt(hex.substring(3, 2), 16),
			parseInt(hex.substring(5, 2), 16)
		);
	}

	private clamp() {
		this._r = Math.min(255, Math.max(0, this.r));
		this._g = Math.min(255, Math.max(0, this.g));
		this._b = Math.min(255, Math.max(0, this.b));
		return this;
	}

	public toString() {
		return `rgb(${this._r}, ${this._g}, ${this._b})`;
	}

	public static readonly black: Color = new Color(0, 0, 0);
	public static readonly white: Color = new Color(255, 255, 255);
	public static readonly red: Color = new Color(255, 0, 0);
	public static readonly green: Color = new Color(0, 255, 0);
	public static readonly blue: Color = new Color(0, 0, 255);
	public static readonly yellow: Color = new Color(255, 255, 0);
	public static readonly cyan: Color = new Color(0, 255, 255);
	public static readonly magenta: Color = new Color(255, 0, 255);
	public static readonly gray: Color = new Color(128, 128, 128);
}
