import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { ISource } from "Experience/Interfaces/ISource";
import EventEmitter from "./EventEmitter";

export default class Resources extends EventEmitter {
    readonly sources: ISource[];
    readonly items: {};
    readonly toLoad: number;
    loaded: number;
    loaders: {
        cubeTextureLoader?: THREE.CubeTextureLoader;
        textureLoader?: THREE.TextureLoader;
        gltfLoader?: GLTFLoader;
    } = {};

    constructor(sources: ISource[]) {
        super();
        this.sources = sources;
        // Setup
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;
        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    }

    startLoading() {
    // Load each source
        for (const source of this.sources) {
            switch (source.type) {
            case "gltfModel":
                this.loaders.gltfLoader?.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    },
                );
                break;
            case "texture":
                this.loaders.textureLoader?.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    },
                );
                break;
            case "cubeTexture":
                this.loaders.cubeTextureLoader?.load(
                    // @ts-expect-error
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    },
                );
                break;
            }
        }
    }

    sourceLoaded(source: ISource, file: GLTF | THREE.Texture | THREE.CubeTexture) {
    // @ts-expect-error
        this.items[source.name] = file;
        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.trigger("ready");
        }
    }
}
