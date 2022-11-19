import * as THREE from 'three';
import { Loader } from './loader';
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
		const light = new THREE.AmbientLight(0xeeeeee);
		this.scene.add(light);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.update();
		const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight1.position.set(1, 1, 0);
		this.scene.add(directionalLight1);
		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight2.position.set(0, 1, -1);
		this.scene.add(directionalLight2);
		this.update();
		this.loadedFile = null;
	}

	setCanvas(canvasRef) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvasRef,
			antialias: false,
			alpha: true
		});
		this.controls.reset();
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.update();
	}

	// ******************* PUBLIC EVENTS ******************* //
	updateFile(file) {
		if (this.loadedFile) {
			this.scene.remove(this.loadedFile);
		}
		this.objLoader.loadFile(file, (object3d) => {
			this.scene.add(object3d);
			this.loadedFile = object3d;
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