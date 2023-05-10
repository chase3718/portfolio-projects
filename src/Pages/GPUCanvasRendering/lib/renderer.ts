export default class Renderer {
	canvas: HTMLCanvasElement | null = null;

	adapter: GPUAdapter | null = null;
	device: GPUDevice | null = null;
	queue: GPUQueue | null = null;

	context: GPUCanvasContext | null = null;
	colorTexture: GPUTexture | null = null;
	colorTextureView: GPUTextureView | null = null;
	depthTexture: GPUTexture | null = null;
	depthTextureView: GPUTextureView | null = null;

	positionBuffer: GPUBuffer | null = null;
	colorBuffer: GPUBuffer | null = null;
	indexBuffer: GPUBuffer | null = null;
	vertModule: GPUShaderModule | null = null;
	fragModule: GPUShaderModule | null = null;
	pipeline: GPURenderPipeline | null = null;

	commandEncoder: GPUCommandEncoder | null = null;
	passEncoder: GPURenderPassEncoder | null = null;

	enabled: boolean = false;

	async init(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		await this.initializeWebGPU().then(async (ok) => {
			this.enabled = ok;
		});
		return this.enabled;
	}

	private async initializeWebGPU() {
		try {
			let gpuDevice = null;
			// Check to ensure the user agent supports WebGPU.
			if (!('gpu' in navigator)) {
				console.error('User agent doesn’t support WebGPU.');
				return false;
			}

			// Request an adapter.
			const gpuAdapter = await window.navigator.gpu.requestAdapter();

			// requestAdapter may resolve with null if no suitable adapters are found.
			if (!gpuAdapter) {
				console.error('No WebGPU adapters found.');
				return false;
			}

			this.adapter = gpuAdapter;

			// Request a device.
			// Note that the promise will reject if invalid options are passed to the optional
			// dictionary. To avoid the promise rejecting always check any features and limits
			// against the adapters features and limits prior to calling requestDevice().
			gpuDevice = await gpuAdapter.requestDevice();
			// requestDevice will never return null, but if a valid device request can’t be
			// fulfilled for some reason it may resolve to a device which has already been lost.
			// Additionally, devices can be lost at any time after creation for a variety of reasons
			// (ie: browser resource management, driver updates), so it’s a good idea to always
			// handle lost devices gracefully.
			gpuDevice.lost.then((info) => {
				console.error(`WebGPU device was lost: ${info.message}`);

				gpuDevice = null;

				// Many causes for lost devices are transient, so applications should try getting a
				// new device once a previous one has been lost unless the loss was caused by the
				// application intentionally destroying the device. Note that any WebGPU resources
				// created with the previous device (buffers, textures, etc) will need to be
				// re-created with the new one.
				if (info.reason != 'destroyed') {
					this.initializeWebGPU();
				}
			});

			this.device = gpuDevice;
			this.queue = gpuDevice.queue;

			// this.enabled = true;

			console.log('WebGPU initialized successfully.');
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}
