import * as THREE from "three";

import Resources from "Experience/Utils/Resources";
import Experience from "../Experience";

export default class World {
    private readonly experience: Experience;
    private readonly scene: THREE.Scene | undefined;
    private readonly resources: Resources;
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // Wait for resources to load
        this.resources.on("ready", () => {
            // Setup

        });
    }

    update() {
    // update the objects in the world
    }
}
