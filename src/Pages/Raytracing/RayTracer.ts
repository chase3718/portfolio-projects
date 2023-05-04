import Camera from './classes/Camera';
import Color from './classes/Color';
import Light from './classes/Light';
import Plane from './classes/Plane';
import Ray from './classes/Ray';
import Scene from './classes/Scene';
import Sphere from './classes/Sphere';

class RayTracer {
	private maxDepth: number;
	constructor(maxDepth: number = 5) {
		this.maxDepth = maxDepth;
	}

	private intersections(ray: Ray, scene: Scene, depth: number = 0): { object: Sphere | Plane; distance: number } {
		let closest = Infinity;
		let closestInter: any = null;
		for (let i in scene.objects) {
			const inter = scene.objects[i].intersect(ray);

			if (inter != null && inter < closest) {
				closestInter = scene.objects[i];
				closest = inter;
			}
		}
		return { object: closestInter, distance: closest };
	}

	private testRay(ray: Ray, scene: Scene, depth: number = 0): any {
		const closest = this.intersections(ray, scene, depth);
		return closest;
	}

	private traceRay(ray: Ray, scene: Scene, depth: number = 0): Color {
		let isect = this.intersections(ray, scene, depth);
		console.log(isect);
		if (!isect || !isect.distance || !isect.object) {
			return scene.skyColor;
		}
		return this.shade(ray, isect, scene, depth);
	}

	private shade(ray: Ray, isect: { object: Sphere | Plane; distance: number }, scene: Scene, depth: number = 0): Color {
		let d = ray.direction;
		let pos = ray.origin.plus(d.times(isect.distance));
		let normal = isect.object.normal(pos);
		let reflectDir = d.minus(normal.times(normal.dot(d)).times(2));
		let naturalColor = scene.skyColor.plus(this.getNaturalColor(isect.object, pos, normal, reflectDir, scene));
		let reflectedColor =
			depth >= this.maxDepth
				? Color.Gray()
				: this.getReflectionColor(isect.object, pos, normal, reflectDir, scene, depth);
		return naturalColor.plus(reflectedColor);
	}

	private getReflectionColor(
		object: Sphere | Plane,
		pos: any,
		normal: any,
		rd: any,
		scene: Scene,
		depth: number = 0
	): Color {
		// return object.surface.reflect(pos).times(this.traceRay(new Ray(pos, rd), scene, depth + 1));
		return this.traceRay(new Ray(pos, rd), scene, depth + 1).times(object.surface.reflect(pos));
	}

	private getNaturalColor(object: Sphere | Plane, pos: any, norm: any, rd: any, scene: Scene): Color {
		let addLight = (col: Color, light: Light): Color => {
			let ldis = light.position.minus(pos);
			let livec = ldis.norm();
			let neatIsect = this.testRay(new Ray(pos, livec), scene);
			let isInShadow = neatIsect === undefined ? false : neatIsect <= ldis.mag();

			if (isInShadow) {
				return col;
			} else {
				let illum = livec.dot(norm);
				let lcolor = illum > 0 ? light.color.times(illum) : Color.Black();
				let specular = livec.dot(rd.norm());
				let scolor = specular > 0 ? light.color.times(Math.pow(specular, object.surface.roughness)) : Color.Black();
				return col.plus(lcolor.times(object.surface.diffuse(pos)).plus(scolor.times(object.surface.specular(pos))));
			}
		};

		return scene.lights.reduce(addLight, Color.Black());
	}

	private getPoint(x: number, y: number, camera: Camera, screen: { width: number; height: number }): Ray {
		let recenterX = (x: number) => (x - screen.width / 2.0) / 2.0 / screen.width;
		let recenterY = (y: number) => -(y - screen.height / 2.0) / 2.0 / screen.height;
		return new Ray(
			camera.position,
			camera.forward.plus(camera.right.times(recenterX(x)).plus(camera.up.times(recenterY(y)))).norm()
		);
	}

	public calculateRay(x: number, y: number, scene: Scene, screen: { width: number; height: number }): Color {
		let ray = new Ray(scene.camera.position, this.getPoint(x, y, scene.camera, screen).direction);
		let color = this.traceRay(ray, scene);
		return color;
	}
}

export default RayTracer;
