import {
  MeshBasicMaterial,
  Object3D,
  Vector2,
} from "three";
import { LatheGeometry } from "three/src/geometries/LatheGeometry";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

export class Lathe {
  spGroup;
  latheMesh;
  constructor() {
    this.spGroup = new Object3D();
    this.latheMesh = new Object3D();
    this.generatePoints(12, 0, Math.PI * 2);
  }

  private generatePoints(
    segments: number,
    phiStart: number,
    phiLength: number
  ) {
    const points: Vector2[] = [];
    const height = 5;
    const count = 30;
    for (let i = 0; i < count; i++) {
      points.push(
        new Vector2((Math.sin(i * 0.2) * height + height) / 2, (i - count) / 2)
      );
    }

    const latheGeometry = new LatheGeometry(
      points,
      segments,
      phiStart,
      phiLength
    );
    this.latheMesh = this.createMesh(latheGeometry);
  }

  private createMesh(geom: LatheGeometry) {
    // assign two materials
    const meshMaterial = new MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.2,
    });
    const wireFrameMat = new MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    const mesh = createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
  }
}
