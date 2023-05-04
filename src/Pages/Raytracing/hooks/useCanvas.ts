import { useRef } from 'react';

export default function useCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasObj = canvasRef.current;
	const ctx = canvasObj?.getContext('2d');

	function draw(color: string, location: { x: number; y: number }) {
		if (ctx) {
			ctx.fillStyle = color;
			ctx.fillRect(location.x, location.y, 1, 1);
		}
	}

	return [canvasRef, draw];
}
