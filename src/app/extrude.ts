import {
    ExtrudeGeometry,
  Matrix4,
  MeshBasicMaterial,
  MeshNormalMaterial,
  Path,
  Shape,
  ShapeGeometry,
  Vector2,
} from "three";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

export class Extrude {
  shape;
  option;
  constructor() {
    this.option = this.setOption();
    this.shape = this.createMesh(
      new ExtrudeGeometry(this.drawShape(), this.option)
    );
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
    const shape = new Shape();

    // startpoint
    shape.moveTo(10, 10);

    // straight line upwards
    shape.lineTo(10, 40);

    // the top of the figure, curve to the right
    shape.bezierCurveTo(15, 25, 25, 25, 30, 40);

    // spline back down
    shape.splineThru([
      new Vector2(32, 30),
      new Vector2(28, 20),
      new Vector2(30, 10),
    ]);

    // curve at the bottom
    shape.quadraticCurveTo(20, 15, 10, 10);

    // add 'eye' hole one
    const hole1 = new Path();
    hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole1);

    // add 'eye hole 2'
    const hole2 = new Path();
    hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole2);

    // add 'mouth'
    const hole3 = new Path();
    hole3.absarc(20, 16, 2, 0, Math.PI, true);
    shape.holes.push(hole3);

    // return the shape
    return shape;
  }

  private createMesh(geom: ShapeGeometry) {
    geom.applyMatrix4(new Matrix4().makeTranslation(-20, 0, 0));

    // assign two materials
    const meshMaterial = new MeshNormalMaterial({
      flatShading: true,
      transparent: true,
      opacity: 0.7,
    });

    //  meshMaterial.side = DoubleSide;
    const wireFrameMat = new MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    const mesh = createMultiMaterialObject(geom, [meshMaterial]);

    return mesh;
  }
}
