import Color from './Color';
import Light from './Light';
import Ray from './Ray';
import Scene from './Scene';
import Plane from './Shapes/Plane';
import Shape from './Shapes/Shape';
import Sphere from './Shapes/Sphere';
import Vector3 from './Vector3';

class Intersection {
	public distance: number;
	public object: Sphere | Plane | null;

	constructor(distance: number, object: Sphere | Plane | null) {
		this.distance = distance;
		this.object = object;
	}
}

export default class RayTracer {
	private _maxDepth: number;

	public get maxDepth(): number {
		return this._maxDepth;
	}

	constructor(maxDepth: number = 5) {
		this._maxDepth = maxDepth;
	}

	public intersections(ray: Ray, scene: Scene): Intersection {
		let closest = +Infinity;
		let closestInter = new Intersection(closest, null);
		if (scene.objects) {
			for (let object of scene.objects) {
				let dist = object.intersect(ray);
				if (dist && dist < closestInter.distance) {
					closestInter.distance = dist;
					closestInter.object = object;
				}
			}
		}
		// console.log(closestInter);
		return closestInter;
	}

	public testRay(ray: Ray, scene: Scene): number {
		let isect = this.intersections(ray, scene);
		if (isect.object) {
			return isect.distance;
		} else {
			return 0;
		}
	}

	public traceRay(ray: Ray, scene: Scene, depth: number = 0): Color {
		let isect = this.intersections(ray, scene);
		if (isect.object && isect.object.name === 'sphere') {
			console.log('sphere');
			return Color.white;
		}
		if (isect.object) {
			return this.shade(isect, scene, ray, depth);
		} else {
			return scene.background;
		}
	}

	public shade(isect: Intersection, scene: Scene, ray: Ray, depth: number): Color {
		let d = ray.direction;
		let pos = Vector3.plus(ray.start, Vector3.scale(d, isect.distance));
		let normal = isect.object!.normal(pos) as Vector3;
		let reflectDir = Vector3.minus(d, Vector3.scale(normal, 2 * Vector3.dot(normal, d)));
		let naturalColor = Color.plus(
			scene.background,
			this.getNaturalColor(isect.object!, pos, normal, reflectDir, scene)
		);
		let reflectedColor =
			depth >= this.maxDepth ? Color.gray : this.getReflectionColor(isect.object!, pos, reflectDir, scene, depth);
		// console.log(naturalColor, reflectedColor);
		return Color.plus(naturalColor, reflectedColor);
	}

	private getReflectionColor(object: Sphere | Plane, pos: Vector3, rd: Vector3, scene: Scene, depth: number): Color {
		// console.log(object.surface.reflect(pos), this.traceRay(new Ray(pos, rd), scene, depth + 1));
		return Color.scale(this.traceRay(new Ray(pos, rd), scene, depth + 1), object.surface.reflect(pos));
	}

	private getNaturalColor(object: Sphere | Plane, pos: Vector3, norm: Vector3, rd: Vector3, scene: Scene): Color {
		let addLight = (col: Color, light: Light) => {
			// let ldis = light.position.minus(pos);
			let ldis = Vector3.minus(light.position, pos);
			let livec = Vector3.norm(ldis);
			let neatIsect = this.testRay(new Ray(pos, livec), scene);
			let isInShadow = !(neatIsect > ldis.mag || neatIsect === 0);
			if (isInShadow) {
				return col;
			} else {
				let illum = livec.dot(norm);
				let lcolor = illum > 0 ? Color.scale(light.color, illum) : Color.black;
				let specular = livec.dot(Vector3.norm(rd));
				let scolor =
					specular > 0 ? Color.scale(light.color, Math.pow(specular, object.surface.roughness)) : Color.black;
				return Color.plus(
					col,
					Color.plus(
						Color.times(object.surface.diffuse(pos), lcolor),
						Color.times(object.surface.specular(pos), scolor)
					)
				);
			}
		};

		return scene.lights ? scene.lights.reduce(addLight, Color.black) : Color.black;
	}
}
