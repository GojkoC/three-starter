import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio, 2);

    constructor() {
        super();
        this.addResizeListener();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    addResizeListener() {
        window.addEventListener("resize", () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.trigger("resize");
        });
    }
}
