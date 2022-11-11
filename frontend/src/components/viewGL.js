import * as THREE from 'three';
import { Loader } from './scene3d/loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class ViewGL {
	constructor(canvasRef) {
		this.objLoader = new Loader();
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.z = 25;
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasRef,
			antialias: false,
			alpha: true
		});
		const light = new THREE.AmbientLight(0xeeeeee); // soft white light
		this.scene.add(light);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		//controls.update() must be called after any manual changes to the camera's transform
		this.controls.update();

		// Create meshes, materials, etc.
		// const geometry = new THREE.BoxGeometry(10, 10, 10);
		// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		// const cube = new THREE.Mesh(geometry, material);
		// this.scene.add(cube);
		this.update();
	}

	// ******************* PUBLIC EVENTS ******************* //
	updateFile(file) {
		this.objLoader.loadFile(file, (object3d) => {
			this.scene.add(object3d);
		});
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
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.update.bind(this));
	}
}