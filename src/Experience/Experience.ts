import * as THREE from "three";

import { Object3D } from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Resources from "./Utils/Resources";
import Debug from "./Utils/Debug";
import sources from "./sources";

let instance: Experience | null = null;

export default class Experience {
    canvas: HTMLCanvasElement | undefined;
    debug: Debug = new Debug();
    sizes: Sizes = new Sizes();
    time: Time = new Time();
    scene: THREE.Scene | undefined;
    resources: Resources = new Resources(sources);
    camera: Camera = new Camera();
    renderer: Renderer = new Renderer();

    constructor(canvas?: HTMLCanvasElement) {
    // Singleton
        if (instance != null) {
            return instance;
        }
        instance = this;

        // Options
        this.canvas = canvas;

        // Resize event
        this.sizes.on("resize", () => this.resize());
        // Time tick event
        this.time.on("tick", () => this.update());
    }

    resize() {
        this.camera.resize();
        this.renderer.resize(); // Watch for the order of calling. First the camera then the renderer
    }

    update() {
        this.camera.update();
        this.renderer.update(); // Watch for the order of calling
    }

    destroy() {
    // Remove event listeners
        this.sizes.off("resize");
        this.time.off("tick");

        // Traverse the scene
        this.scene?.traverse((child: Object3D) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();

                for (const key in child.material) {
                    const value = child.material[key];

                    if (value && typeof value.dispose === "function") {
                        value.dispose();
                    }
                }
            }
        });

        this.camera.controls.dispose();
        this.renderer.instance?.dispose();

        if (this.debug.active) {
            this.debug.ui?.destroy();
        }
    }
}
