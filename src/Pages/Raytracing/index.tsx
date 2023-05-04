import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { Scene, Camera, Vector3, Color, Light, Sphere, Plane, Surfaces } from './classes';

import RayTracer from './RayTracer';

const initialScene = new Scene(
	[
		new Plane(new Vector3(0.0, 1.0, 0.0), 0.0, Surfaces.checkerboard),
		new Sphere(new Vector3(0.0, 1.0, -0.25), 1.0, Surfaces.shiny),
		new Sphere(new Vector3(-1.0, 0.5, 1.5), 0.5, Surfaces.shiny),
	],
	[
		new Light(new Vector3(-2.0, 2.5, 0.0), new Color(0.49, 0.07, 0.07)),
		new Light(new Vector3(1.5, 2.5, 1.5), new Color(0.07, 0.07, 0.49)),
		new Light(new Vector3(1.5, 2.5, -1.5), new Color(0.07, 0.49, 0.071)),
		new Light(new Vector3(0.0, 3.5, 0.0), new Color(0.21, 0.21, 0.35)),
	],
	new Camera(new Vector3(3.0, 2.0, 4.0), new Vector3(-1.0, 0.5, 0.0)),
	Color.Cyan()
);

const rt = new RayTracer(1);

export default function Raytracing() {
	let canvasRef = useRef<HTMLCanvasElement>(null);
	const [resolution, setResolution] = useState(0.2);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas == null) return; // current may be null
		const context = canvas.getContext('2d');
		if (context == null) return; // context may be null

		//Our first draw
		renderScene(canvas, context);
	}, []);

	const renderScene = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
		let height = canvas.height * resolution;
		let width = canvas.width * resolution;
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				// const color = rt
				// 	.calculateRay(x, y, initialScene, { width: canvas.width, height: canvas.height })
				// 	.toDrawingColor();
				// const colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
				// context.fillStyle = colorString;
				// context.fillRect(x, y, 1 / resolution, 1 / resolution);
			}
		}
	};

	return (
		<canvas ref={canvasRef} className="Raytracing">
			RAYTRACING
		</canvas>
	);
}
