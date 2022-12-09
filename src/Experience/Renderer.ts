import * as THREE from "three";

import Camera from "Experience/Camera";
import Sizes from "Experience/Utils/Sizes";
import Experience from "./Experience";

export default class Renderer {
    experience: Experience;
    readonly canvas: HTMLCanvasElement | undefined;
    sizes: Sizes;
    camera: Camera;
    readonly scene: THREE.Scene | undefined;
    instance: THREE.WebGLRenderer | undefined;

    constructor() {
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.camera = this.experience.camera;
        this.scene = this.experience.scene;

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMapping = THREE.CineonToneMapping;
        this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setClearColor("#211d20");
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.instance?.setSize(this.sizes.width, this.sizes.height);
        this.instance?.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        if (this.scene != null) {
            // @ts-expect-error
            this.instance?.render(this.scene, this.camera.instance);
        }
    }
}
