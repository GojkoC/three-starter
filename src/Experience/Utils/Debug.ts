import * as lil from "lil-gui";

export default class Debug {
    readonly active: boolean;
    ui: lil.GUI | undefined;

    constructor() {
        this.active = window.location.hash === "#debug";

        if (this.active) {
            this.ui = new lil.GUI();
        }
    }
}
