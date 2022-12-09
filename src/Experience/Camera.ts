import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Experience from "./Experience";

export default class Camera {
    instance: THREE.PerspectiveCamera | undefined;
    experience = new Experience();
    sizes = this.experience.sizes;
    scene = this.experience.scene;
    canvas = this.experience.canvas;
    controls: any;

    constructor() {
        this.setInstance();
        this.setOrbitControls();
    }

    update() {
        this.controls.update();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100,
        );

        this.scene?.add(this.instance);
    }

    setOrbitControls() {
        if (this.instance != null) {
            this.controls = new OrbitControls(this.instance, this.canvas);
            this.controls.enableDamping = true;
        }
    }

    resize() {
        if (this.instance != null) {
            this.instance.aspect = this.sizes.width / this.sizes.height;
            this.instance.updateProjectionMatrix();
        }
    }
}
