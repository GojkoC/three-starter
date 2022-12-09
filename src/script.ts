import "./styles.css";
import Experience from "./Experience/Experience";

const canvas: HTMLCanvasElement | null = document.querySelector("canvas.webgl");

if (canvas) {
    new Experience(canvas);
}
