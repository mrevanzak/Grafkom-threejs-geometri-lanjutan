import {
  Box3,
  EdgesGeometry,
  ExtrudeBufferGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

export class ExtrudeSVG {
  shape;
  option;
  constructor() {
    this.option = this.setOption();
    this.shape = this.drawShape();
  }

  private setOption() {
    const option = {
      steps: 2,
      depth: 10,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    };
    return option;
  }

  private drawShape() {
    const svg = `<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" height="100%" style="fill-rule:nonzero;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;" xml:space="preserve" width="100%" version="1.1" viewBox="0 0 24 24">
<defs/>
<g id="Untitled">
<path d="M7.15256e-07+7.15256e-07L24+7.15256e-07L24+24L7.15256e-07+24L7.15256e-07+7.15256e-07M6.30667+20.0533C6.84+21.1867+7.89333+22.12+9.69333+22.12C11.6933+22.12+13.0667+21.0533+13.0667+18.72L13.0667+11.0133L10.8+11.0133L10.8+18.6667C10.8+19.8133+10.3333+20.1067+9.6+20.1067C8.82667+20.1067+8.50667+19.5733+8.14667+18.9467L6.30667+20.0533M14.28+19.8133C14.9467+21.12+16.2933+22.12+18.4+22.12C20.5333+22.12+22.1333+21.0133+22.1333+18.9733C22.1333+17.0933+21.0533+16.2533+19.1333+15.4267L18.5733+15.1867C17.6+14.7733+17.1867+14.4933+17.1867+13.8267C17.1867+13.28+17.6+12.8533+18.2667+12.8533C18.9067+12.8533+19.3333+13.1333+19.72+13.8267L21.4667+12.6667C20.7333+11.3867+19.6933+10.8933+18.2667+10.8933C16.2533+10.8933+14.96+12.1733+14.96+13.8667C14.96+15.7067+16.04+16.5733+17.6667+17.2667L18.2267+17.5067C19.2667+17.96+19.88+18.24+19.88+19.0133C19.88+19.6533+19.28+20.12+18.3467+20.12C17.24+20.12+16.6+19.5467+16.12+18.7467L14.28+19.8133Z" opacity="1" fill="#000000"/>
</g>
</svg>`;

    const { object } = this.renderSVG(svg);
    return object;
  }

  private renderSVG(svg: string) {
    const loader = new SVGLoader();
    const svgData = loader.parse(svg);
    const svgGroup = new Group();
    const updateMap = [];
    const fillMaterial = new MeshBasicMaterial({ color: "#F3FBFB" });
    const stokeMaterial = new LineBasicMaterial({
      color: "#00A5E6",
    });

    svgGroup.scale.y *= -1;
    svgData.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);

      shapes.forEach((shape) => {
        const meshGeometry = new ExtrudeBufferGeometry(shape, this.option);
        const linesGeometry = new EdgesGeometry(meshGeometry);
        const mesh = new Mesh(meshGeometry, fillMaterial);
        const lines = new LineSegments(linesGeometry, stokeMaterial);

        updateMap.push({ shape, mesh, lines });
        svgGroup.add(mesh, lines);
      });
    });

    const box = new Box3().setFromObject(svgGroup);
    const size = box.getSize(new Vector3());
    const yOffset = size.y / -2;
    const xOffset = size.x / -2;

    // Offset all of group's elements, to center them
    svgGroup.children.forEach((item) => {
      item.position.x = xOffset;
      item.position.y = yOffset;
    });
    svgGroup.rotateX(-Math.PI / 2);

    return {
      object: svgGroup,
    };
  }
}
