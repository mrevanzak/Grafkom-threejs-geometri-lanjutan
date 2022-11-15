import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer, Clock, DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Dodecahedron } from './dodecahedron';
import { Extrude } from './extrude';
import { Lathe } from './lathe';
import { Tube } from './tube';
import { ExtrudeSVG } from './svg';

export class App {
  private readonly timer = new Clock();
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    10000
  );
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });
  private readonly light1 = new DirectionalLight();
  private readonly light2 = new DirectionalLight();
  private readonly controls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );

  private dodecahedron: Dodecahedron;
  private lathe: Lathe;
  private extrude: Extrude;
  private tube: Tube;
  private svg: ExtrudeSVG;

  constructor() {
    this.light1.position.set(25, 23, 15);
    this.light2.position.set(-25, 23, 15);
    this.scene.add(this.light1);
    this.scene.add(this.light2);

    this.dodecahedron = new Dodecahedron();
    this.lathe = new Lathe();
    this.extrude = new Extrude();
    this.tube = new Tube();
    this.svg = new ExtrudeSVG();

    const button1 = document.getElementById("button1") as HTMLButtonElement;
    button1.addEventListener("click", () => {
      this.scene.add(this.dodecahedron.convexMesh);
      this.scene.remove(this.lathe.latheMesh);
      this.scene.remove(this.extrude.shape);
      this.scene.remove(this.tube.tubeMesh);
      this.scene.remove(this.svg.shape);
    });

    const button2 = document.getElementById("button2") as HTMLButtonElement;
    button2.addEventListener("click", () => {
      this.scene.add(this.lathe.latheMesh);
      this.scene.remove(this.dodecahedron.convexMesh);
      this.scene.remove(this.extrude.shape);
      this.scene.remove(this.tube.tubeMesh);
      this.scene.remove(this.svg.shape);
    });

    const button3 = document.getElementById("button3") as HTMLButtonElement;
    button3.addEventListener("click", () => {
      this.scene.add(this.extrude.shape);
      this.scene.remove(this.dodecahedron.convexMesh);
      this.scene.remove(this.lathe.latheMesh);
      this.scene.remove(this.tube.tubeMesh);
      this.scene.remove(this.svg.shape);
    });

    const button4 = document.getElementById("button4") as HTMLButtonElement;
    button4.addEventListener("click", () => {
      this.scene.add(this.tube.tubeMesh);
      this.scene.remove(this.dodecahedron.convexMesh);
      this.scene.remove(this.lathe.latheMesh);
      this.scene.remove(this.extrude.shape);
      this.scene.remove(this.svg.shape);
    });

    const button5 = document.getElementById("button5") as HTMLButtonElement;
    button5.addEventListener("click", () => {
      this.scene.add(this.svg.shape);
      this.scene.remove(this.dodecahedron.convexMesh);
      this.scene.remove(this.lathe.latheMesh);
      this.scene.remove(this.extrude.shape);
      this.scene.remove(this.tube.tubeMesh);
    });

    // this.scene.add(this.dodecahedron.convexMesh);
    // this.scene.add(this.lathe.latheMesh);
    // this.scene.add(this.extrude.shape);
    // this.scene.add(this.tube.tubeMesh);
    // this.scene.add(this.svg.shape);

    this.camera.position.set(-30, 40, 50);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color("rgb(0,0,0)"));

    this.render();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    const delta = this.timer.getDelta();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
    this.adjustCanvasSize();
    this.dodecahedron.convexMesh.rotation.y += 0.5 * delta;
    this.lathe.latheMesh.rotation.y += 0.5 * delta;
    this.extrude.shape.rotation.y += 0.5 * delta;
    this.tube.tubeMesh.rotation.y += 0.5 * delta;
  }
}
