/* eslint-disable indent */
/**
 * @author mrdoob / http://mrdoob.com/
 */
import { LoadingManager, MeshStandardMaterial, AnimationMixer, Mesh, Group, MeshBasicMaterial, ShapeBufferGeometry, BufferGeometryLoader, ObjectLoader, LoaderUtils } from 'three';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import { AMFLoader } from 'three/examples/jsm/loaders/AMFLoader';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';

var draco = null;

var Loader = function () {
	var usingFile = true;
	var scope = this;
	this.texturePath = '';
	scope.closeDraco = true;

	this.loadFromPath = function (path, onLoad, manager = null) {
		if (!manager) {
			manager = new LoadingManager(function () {
			});
		}
		let extension = path.split('.').pop().toLowerCase();
		let loader;
		let dracoLoader = draco ? draco : new DRACOLoader();
		draco = dracoLoader;

		switch (extension) {
			case 'dae':
				loader = new ColladaLoader(manager);
				loader.load(path, function (collada) {
					onLoad(collada.scene);
				});
				break;
			case 'gltf':
			case 'glb': {
				loader = new GLTFLoader(manager);
				dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
				loader.setDRACOLoader(dracoLoader);
				loader.load(path, function (scene) {
					if (dracoLoader && scope.closeDraco) dracoLoader.dispose();
					onLoad(scene);
				});
			}
				break;
		}


	};

	this.loadFiles = function (files, onLoad) {
		if (files.length > 0) {
			var filesMap = createFileMap(files);
			var manager = new LoadingManager();
			manager.setURLModifier(function (url) {
				var file = filesMap[url];
				if (file) {
					console.log('Loading', url);
					return URL.createObjectURL(file);
				}
				return url;
			});
			for (var i = 0; i < files.length; i++) {
				scope.loadFile(files[i], manager, onLoad);
			}
		}
	};

	this.loadFile = function (file, onLoad) {
		const manager = new LoadingManager();
		var filename = file.name;
		var extension = file.name.split('.').pop().toLowerCase();
		var reader = new FileReader();
		reader.addEventListener('progress', function (event) {
			var size = '(' + Math.floor(event.total / 1000) + ' KB)';
			var progress = Math.floor((event.loaded / event.total) * 100) + '%';
			console.log('Loading', filename, size, progress);
		});
		switch (extension) {
			case '3ds':
				reader.addEventListener('load', function (event) {
					var loader = new TDSLoader();
					var object = loader.parse(event.target.result);
					onLoad(object);
				}, false);
				reader.readAsArrayBuffer(file);
				break;

			case 'amf':
				reader.addEventListener('load', function (event) {
					var loader = new AMFLoader();
					var amfobject = loader.parse(event.target.result);
					onLoad(amfobject);
				}, false);
				reader.readAsArrayBuffer(file);
				break;

			case 'dae':
				var loader = new ColladaLoader(manager);
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var collada = loader.parse(contents);
					collada.scene.name = filename;
					onLoad(collada.scene);

				}, false);
				if (usingFile) {
					reader.readAsText(file);
				} else {
					loader.load(filename, function (collada) {
						collada.scene.name = filename;
						onLoad(collada.scene);
					});
				}
				break;

			case 'fbx':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var loader = new FBXLoader(manager);
					var object = loader.parse(contents);
					onLoad(object);
				}, false);
				reader.readAsArrayBuffer(file);
				break;

			case 'glb':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var dracoLoader = new DRACOLoader();
					dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
					var loader = new GLTFLoader();
					loader.setDRACOLoader(dracoLoader);
					loader.parse(contents, '', function (result) {
						var scene = result.scene;
						scene.name = filename;
						onLoad(scene);
					});
				}, false);
				reader.readAsArrayBuffer(file);
				break;

			case 'gltf':

				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var loader;
					loader = new GLTFLoader(manager);
					loader.parse(contents, '', function (result) {
						var scene = result.scene;
						scene.name = filename;
						onLoad(scene);
					});
				}, false);
				reader.readAsArrayBuffer(file);
				break;

			case 'js':
			case 'json':
			case '3geo':
			case '3mat':
			case '3obj':
			case '3scn':

				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					// 2.0
					if (contents.indexOf('postMessage') !== -1) {
						var blob = new Blob([contents], {
							type: 'text/javascript'
						});
						var url = URL.createObjectURL(blob);
						var worker = new Worker(url);
						worker.onmessage = function (event) {
							event.data.metadata = {
								version: 2
							};
							handleJSON(event.data, file, filename);
						};
						worker.postMessage(Date.now());
						return;
					}
					// >= 3.0
					var data;
					try {
						data = JSON.parse(contents);
					} catch (error) {
						alert(error);
						return;
					}
					handleJSON(data, file, filename);
				}, false);
				reader.readAsText(file);
				break;


			case 'md2':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var geometry = new MD2Loader().parse(contents);
					var material = new MeshStandardMaterial({
						morphTargets: true,
						morphNormals: true
					});
					var mesh = new Mesh(geometry, material);
					mesh.mixer = new AnimationMixer(mesh);
					mesh.name = filename;
					onLoad(mesh);
				}, false);
				reader.readAsArrayBuffer(file);
				break;

			case 'obj':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var object = new OBJLoader().parse(contents);
					object.name = filename;
					onLoad(object);
				}, false);
				reader.readAsText(file);
				break;

			case 'ply':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var geometry = new PLYLoader().parse(contents);
					geometry.sourceType = 'ply';
					geometry.sourceFile = file.name;
					var material = new MeshStandardMaterial();
					var mesh = new Mesh(geometry, material);
					mesh.name = filename;
					onLoad(mesh);
				}, false);
				reader.readAsArrayBuffer(file);
				break;

			case 'stl':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var geometry = new STLLoader().parse(contents);
					geometry.sourceType = 'stl';
					geometry.sourceFile = file.name;
					var material = new MeshStandardMaterial();
					var mesh = new Mesh(geometry, material);
					mesh.name = filename;
					onLoad(mesh);
				}, false);

				if (reader.readAsBinaryString !== undefined) {
					reader.readAsBinaryString(file);
				} else {
					reader.readAsArrayBuffer(file);
				}
				break;

			case 'svg':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var loader = new SVGLoader();
					var paths = loader.parse(contents).paths;
					var group = new Group();
					group.scale.multiplyScalar(0.1);
					group.scale.y *= -1;
					for (var i = 0; i < paths.length; i++) {
						var path = paths[i];
						var material = new MeshBasicMaterial({
							color: path.color,
							depthWrite: false
						});
						var shapes = path.toShapes(true);
						for (var j = 0; j < shapes.length; j++) {
							var shape = shapes[j];
							var geometry = new ShapeBufferGeometry(shape);
							var mesh = new Mesh(geometry, material);
							group.add(mesh);
						}
					}
					onLoad(group);
				}, false);
				reader.readAsText(file);
				break;

			case 'vtk':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var geometry = new VTKLoader().parse(contents);
					geometry.sourceType = 'vtk';
					geometry.sourceFile = file.name;
					var material = new MeshStandardMaterial();
					var mesh = new Mesh(geometry, material);
					mesh.name = filename;
					onLoad(mesh);
				}, false);
				reader.readAsText(file);
				break;

			case 'wrl':
				reader.addEventListener('load', function (event) {
					var contents = event.target.result;
					var result = new VRMLLoader().parse(contents);
					onLoad(result);
				}, false);
				reader.readAsText(file);
				break;

			default:
				// alert( 'Unsupported file format (' + extension +  ').' );
				break;
		}
	};

	function handleJSON(data, file, filename, onLoad) {
		if (data.metadata === undefined) { // 2.0
			data.metadata = {
				type: 'Geometry'
			};
		}
		if (data.metadata.type === undefined) { // 3.0
			data.metadata.type = 'Geometry';
		}
		if (data.metadata.formatVersion !== undefined) {
			data.metadata.version = data.metadata.formatVersion;
		}

		switch (data.metadata.type.toLowerCase()) {

			case 'buffergeometry':
				var loader = new BufferGeometryLoader();
				var result = loader.parse(data);
				var mesh = Mesh(result);
				onLoad(mesh);
				break;

			case 'geometry':
				console.error('Loader: "Geometry" is no longer supported.');
				break;

			case 'object':
				var loader = new ObjectLoader();
				loader.setResourcePath(scope.texturePath);
				var result = loader.parse(data);
				if (result.isScene) {
					onLoad(result);
				} else {
					onLoad(result);
				}
				break;

			case 'app':
				//editor.fromJSON(data);
				break;

		}

	}

	function createFileMap(files) {
		var map = {};
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			map[file.name] = file;
		}
		return map;
	}

};

export { Loader };