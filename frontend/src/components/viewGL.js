import * as THREE from 'three';

export default class ViewGL {
	constructor(canvasRef) {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 25;
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasRef,
			antialias: false,
		});
		// Create meshes, materials, etc.
		const geometry = new THREE.BoxGeometry(10, 10, 10);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		this.scene.add(cube);
		this.update();
	}

	// ******************* PUBLIC EVENTS ******************* //
	updateValue(value) {
		// Whatever you need to do with React props
	}

	onMouseMove() {
		// Mouse moves
	}

	onWindowResize(vpW, vpH) {
		this.camera.aspect = vpW / vpH;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(vpW, vpH);
	}

	// ******************* RENDER LOOP ******************* //
	update(t) {
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.update.bind(this));
	}
}