import Color from './Color';

class Surfaces {
	shiny = {
		diffuse: function (pos: any) {
			return Color.White();
		},
		specular: function (pos: any) {
			return Color.Gray();
		},
		reflect: function (pos: any) {
			return 0.7;
		},
		roughness: 250,
	};
	checkerboard = {
		diffuse: function (pos: any) {
			if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
				return Color.White();
			} else {
				return Color.Black();
			}
		},
		specular: function (pos: any) {
			return Color.White();
		},
		reflect: function (pos: any) {
			if ((Math.floor(pos.z) + Math.floor(pos.x)) % 2 !== 0) {
				return 0.1;
			} else {
				return 0.7;
			}
		},
		roughness: 150,
	};
}
const surfaces = new Surfaces();
export default surfaces;
