import { MeshBasicMaterial, Object3D, Vector3 } from "three";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

export class Dodecahedron {
  convexMesh;
  constructor() {
    this.convexMesh = new Object3D();
    this.generatePoints();
  }

  private generatePoints() {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const randomX = -15 + Math.round(Math.random() * 30);
      const randomY = -15 + Math.round(Math.random() * 30);
      const randomZ = -15 + Math.round(Math.random() * 30);

      points.push(new Vector3(randomX, randomY, randomZ));
    }

    const convexGeometry = new ConvexGeometry(points);
    this.convexMesh = this.createMesh(convexGeometry);
  }  

  private createMesh(geom: ConvexGeometry) {
    // assign two materials
    const meshMaterial = new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.2 });
    const wireFrameMat = new MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    const mesh = createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
  }
}