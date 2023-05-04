export default class Color {
	public r: number;
	public g: number;
	public b: number;
	public a: number;

	constructor(r: number, g: number, b: number, a: number = 1) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	public times(k: number): Color {
		return new Color(this.r * k, this.g * k, this.b * k, this.a * k);
	}

	public multiply(v: Color): Color {
		return new Color(this.r * v.r, this.g * v.g, this.b * v.b, this.a * v.a);
	}

	public plus(v: Color): Color {
		return new Color(this.r + v.r, this.g + v.g, this.b + v.b, this.a + v.a);
	}

	public minus(v: Color): Color {
		return new Color(this.r - v.r, this.g - v.g, this.b - v.b, this.a - v.a);
	}

	public divide(k: number): Color {
		return new Color(this.r / k, this.g / k, this.b / k, this.a / k);
	}

	public dot(v: Color): number {
		return this.r * v.r + this.g * v.g + this.b * v.b + this.a * v.a;
	}

	public mag(): number {
		return Math.sqrt(this.r * this.r + this.g * this.g + this.b * this.b + this.a * this.a);
	}

	public norm(): Color {
		const mag = this.mag();
		const div = mag === 0 ? Infinity : 1.0 / mag;
		return this.times(div);
	}

	public cross(v: Color): Color {
		return new Color(this.g * v.b - this.b * v.g, this.b * v.r - this.r * v.b, this.r * v.g - this.g * v.r, 0);
	}

	public toDrawingColor(): { r: number; g: number; b: number; a: number } {
		const legalize = (d: number) => (d > 1 ? 1 : d);
		return {
			r: Math.floor(legalize(this.r) * 255),
			g: Math.floor(legalize(this.g) * 255),
			b: Math.floor(legalize(this.b) * 255),
			a: Math.floor(legalize(this.a) * 255),
		};
	}

	public static White(): Color {
		return new Color(1, 1, 1);
	}

	public static Black(): Color {
		return new Color(0, 0, 0);
	}

	public static Red(): Color {
		return new Color(1, 0, 0);
	}

	public static Green(): Color {
		return new Color(0, 1, 0);
	}

	public static Blue(): Color {
		return new Color(0, 0, 1);
	}

	public static Yellow(): Color {
		return new Color(1, 1, 0);
	}

	public static Cyan(): Color {
		return new Color(0, 1, 1);
	}

	public static Purple(): Color {
		return new Color(1, 0, 1);
	}

	public static Gray(): Color {
		return new Color(0.5, 0.5, 0.5);
	}

	public static Random(): Color {
		return new Color(Math.random(), Math.random(), Math.random());
	}
}
