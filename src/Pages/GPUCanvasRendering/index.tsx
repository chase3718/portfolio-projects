import React, { useEffect, useRef, useState } from 'react';
import Renderer from './lib/renderer';
import init, { add } from 'graphics';

export default function GPUCanvasRendering() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [renderer, setRenderer] = useState<Renderer | null>(null);
	const [enabled, setEnabled] = useState<boolean>(false);
	const [ans, setAns] = useState<number>(0);

	useEffect(() => {
		init();
		if (!renderer) setRenderer(new Renderer());
	}, []);

	useEffect(() => {
		if (renderer) {
			renderer.init(canvasRef.current!).then((enabled) => {
				setEnabled(enabled);
			});
		}
	}, [renderer]);

	// return enabled ? <canvas ref={canvasRef}></canvas> : <h1>WebGPU not enabled</h1>;
	return (
		<button
			onClick={() => {
				setAns(add(ans, 2));
			}}
		>
			{ans}
		</button>
	);
}
