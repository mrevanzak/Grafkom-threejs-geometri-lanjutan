import {
  MeshBasicMaterial,
  Object3D,
  Vector2,
} from "three";
import { LatheGeometry } from "three/src/geometries/LatheGeometry";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

export class Lathe {
  latheMesh;
  constructor() {
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
    const count = 20;
    for (let i = 0; i < count; i++) {
      points.push(
        new Vector2(
          Math.sin((i * 0.2) * height) * 2 + 3,
          (i - count) * 0.8
        )
      );
    }

    const latheGeometry = new LatheGeometry(
      points,
      segments,
      phiStart,
      phiLength
    );
    this.latheMesh = this.createMesh(latheGeometry);
    this.latheMesh.position.set(0, 10, 0);
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
