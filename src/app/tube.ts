import {
  CurvePath,
  MeshBasicMaterial,
  Object3D,
  QuadraticBezierCurve3,
  TubeGeometry,
  Vector3,
} from "three";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

export class Tube {
  spGroup;
  tubeMesh;
  constructor() {
    this.spGroup = new Object3D();
    this.tubeMesh = new Object3D();
    this.generatePoints();
  }

  private generatePoints() {
    const path = new CurvePath<Vector3>();
    path.add(new QuadraticBezierCurve3(new Vector3(10, 10, 10), new Vector3(0, 15, 0), new Vector3(10, 20, 10)));
    const tubeGeometry = new TubeGeometry(path, 800, 0.25, 20, false);
    this.tubeMesh = this.createMesh(tubeGeometry);
  }

  private createMesh(geom: TubeGeometry) {
    // assign two materials
    //const meshMaterial = new MeshNormalMaterial();
    const meshMaterial = new MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.9,
    });

    const wireFrameMat = new MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    const mesh = createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
  }
}
