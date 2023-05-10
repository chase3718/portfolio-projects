import React, { useEffect, useState } from 'react';
import Surface from './lib/Surfaces';
import Vector3 from './lib/Vector3';
import Plane from './lib/Shapes/Plane';
import Sphere from './lib/Shapes/Sphere';
import Light from './lib/Light';
import Color from './lib/Color';
import Camera from './lib/Camera';
import Scene from './lib/Scene';
import { useRenderer } from './hooks/useRenderer';

const canvas = document.createElement('canvas');
canvas.id = 'rayTracerCanvas';
canvas.width = 500;
canvas.height = 500;
const objects = [
	new Plane(new Vector3(0, 1, 0), Surface.checkerboard),
	new Sphere(new Vector3(0, 1, -0.25), 1, Surface.shiny),
	new Sphere(new Vector3(-1, 0.5, 1.5), 0.5, Surface.checkerboard),
];
const lights = [new Light(new Vector3(-2, 2.5, 0), new Color(125, 18, 18))];
const camera = new Camera(new Vector3(3, 2, 4), new Vector3(-1, 0.5, 0));
const scene = new Scene(objects, lights, camera);

export default function Raytracing() {
	const [isRendering, setIsRendering] = useState(false);
	const { renderer, rendering } = useRenderer(canvas);

	useEffect(() => {
		console.log(rendering);
	}, [rendering]);

	const render = () => {
		if (!document.getElementById('rayTracerCanvas')) {
			document.getElementById('rayTracers')!.appendChild(canvas);
		}
		console.log('rendering');
		setIsRendering(true);
		renderer.renderScene(scene);
		setIsRendering(false);
		console.log('done rendering');
	};

	return (
		<div id="rayTracers">
			<button onClick={() => render()}>Render</button>
		</div>
	);
}
