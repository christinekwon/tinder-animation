import { Group, Scene } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import MODEL from "./flame.obj";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import * as THREE from "three";
import POSX from "./textures/FishPond/posx.jpg";
import NEGX from "./textures/FishPond/negx.jpg";
import POSY from "./textures/FishPond/posy.jpg";
import NEGY from "./textures/FishPond/negy.jpg";
import POSZ from "./textures/FishPond/posz.jpg";
import NEGZ from "./textures/FishPond/negz.jpg";
// import WHITE from "./textures/white/white.png";
import CLOUDS from "./textures/Clouds/clouds.jpg";
// import POSX from "../../scenes/textures/Skybox/posx.jpg";
// import NEGX from "../../scenes/textures/Skybox/negx.jpg";
// import POSY from "../../scenes/textures/Skybox/posy.jpg";
// import NEGY from "../../scenes/textures/Skybox/negy.jpg";
// import POSZ from "../../scenes/textures/Skybox/posz.jpg";
// import NEGZ from "../../scenes/textures/Skybox/negz.jpg";

class Flame extends Group {
  constructor(parent, scale, x, y, z, color, direction, speed, offset) {
    // Call parent Group() constructor
    super();

    // Init state
    this.state = {
		gui: parent.state.gui,
		bob: true,
		spin: this.spin.bind(this),
		twirl: 0,

	};

	this.direction = direction;
	this.speed = speed;
  
	// var envMap = new THREE.CubeTextureLoader()
	// 	.load( [
	// 		POSX, NEGX,
	// 		POSY, NEGY,
	// 		POSZ, NEGZ
	// 	] );

	var envMap = new THREE.CubeTextureLoader()
	.load( [
		CLOUDS, CLOUDS,
		CLOUDS, CLOUDS,
		CLOUDS, CLOUDS
	] );

    var material = new THREE.MeshPhongMaterial({
		color: color,
		envMap: envMap,
		refractionRatio: 0.7,
		specular: 0xffffff,
		shininess: 1000
	});
	material.envMap.mapping = THREE.CubeRefractionMapping;

	// var material = new THREE.MeshStandardMaterial( {
	// 	// color: 0xfcc742,
	// 	// emissive: 0xad6a0e,
	// 	// gold
	// 	color: color,
	// 	// emissive: 0x000000,
	// 	// pink
	// 	// color: 0xffcad4,
	// 	// emissive: 0xef798a,
	// 	//silver
	// 	// color: 0xffffff,
	// 	// emissive: 0x444444,
	// 	metalness: 1,
	// 	roughness: 0.1,
	// 	// metalness: 1,   // between 0 and 1
	// 	// roughness: 0.5, // between 0 and 1
	// 	envMap: envMap,
	// 	envMapIntensity: 1
	// } );


	const objloader = new OBJLoader();

	var mesh;
    objloader.load(MODEL, obj => {
		// obj.position.x = x;
		// obj.position.y = y;
		// obj.position.z = z;
		// obj.rotation.set(0, Math.PI/4, 0);
		// obj.scale.multiplyScalar(scale);
		// obj.children[0].material = material;

		// obj.matrixAutoUpdate = false;
		// obj.updateMatrix();
		
		// // uncomment to add octopus
		// this.add(obj);
		// this.obj = obj;

		var child = obj.children[0];
		mesh = new THREE.Mesh(child.geometry, material);
		mesh.rotation.set(0, 0, 0);
		mesh.scale.multiplyScalar(scale);
		// mesh.rotation.set(Math.PI / 2, 0, 0);
		// this.mesh = mesh;
		// this.mesh = obj;
		// this.add(obj);

		var pivot = new THREE.Group();
		pivot.position.set(x, y, z);
		// this.add(obj);
		// pivot.add(mesh);
		// mesh.add(pivot);

		this.add(pivot);
		this.add(mesh);

		this.pivot = pivot;

		this.mesh = mesh;
		this.pivot.add(this.mesh);
		this.state.twirl += 1200 * Math.PI;

	});

	
    
    parent.addToUpdateList(this);
    
    // Populate GUI
    // this.state.gui.add(this.state, 'bob');
	// this.state.gui.add(this.state, 'spin');


  }

	spin() {
		// Add a simple twirl
		this.state.twirl += 12 * Math.PI;

		// Use timing library for more precice "bounce" animation
		// TweenJS guide: http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/
		// Possible easings: http://sole.github.io/tween.js/examples/03_graphs.html
		// const jumpUp = new TWEEN.Tween(this.pivot.position)
		// 	.to({ y: this.pivot.position.y + 3 }, 300)
		// 	.easing(TWEEN.Easing.Quadratic.Out);
		// const fallDown = new TWEEN.Tween(this.pivot.position)
		// 	.to({ y: this.y }, 300)
		// 	.easing(TWEEN.Easing.Quadratic.In);

		// // Fall down after jumping up
		// jumpUp.onComplete(() => fallDown.start());

		// // Start animation
		// jumpUp.start();
	}

	update(timeStamp) {
        if (this.state.bob) {
            // Bob back antd forth
            // this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        }
        if (this.state.twirl > 0) {
            // Lazy implementation of twirl
            // this.state.twirl -= Math.PI / 8;
			// if (this.direction < 0) {
			// 	this.pivot.rotation.y += Math.PI / this.speed;
			// }
			// else {
			// 	this.pivot.rotation.y -= Math.PI / this.speed;
			// }
			this.pivot.rotation.y += Math.PI / 100;

        }
        TWEEN.update();
	}
}

export default Flame;
