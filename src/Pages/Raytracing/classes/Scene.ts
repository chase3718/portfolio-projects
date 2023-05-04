import Camera from './Camera';
import Color from './Color';
import Plane from './Plane';
import Sphere from './Sphere';

export default class Scene {
	public objects: (Sphere | Plane)[];
	public lights: any[];
	public camera: Camera;
	public skyColor: Color;
	constructor(objects: (Sphere | Plane)[], lights: any[], camera: Camera, skyColor: Color = Color.White()) {
		this.objects = objects;
		this.lights = lights;
		this.camera = camera;
		this.skyColor = skyColor;
	}
}
