import { useState } from 'react';

import CanvasRenderer from '../lib/CanvasRenderer';

export function useRenderer(canvas: HTMLCanvasElement) {
	const [rendering, setRendering] = useState(false);
	const renderer = new CanvasRenderer(canvas, setRendering);

	return { renderer, rendering };
}
