import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { MeshNormalMaterial, Object3D } from "three";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";

export class Text {
  textMesh;
  constructor() {
    this.textMesh = new Object3D();
    this.getFont();
  }

  private getFont() {
    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        const textGeometry = new TextGeometry("Kontol", {
          font: font,
          size: 90,
          height: 90,
          bevelThickness: 2,
          bevelEnabled: true,
          bevelSegments: 3,
          curveSegments: 12,
        });
          this.textMesh = this.createMesh(textGeometry);
      }
    );
  }

  private createMesh(geom: TextGeometry) {
    // assign two materials
    //            var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
    //            var meshMaterial = new THREE.MeshNormalMaterial();
    const meshMaterial = new MeshNormalMaterial({
      flatShading: true,
      transparent: true,
      opacity: 0.7,
    });
    //            meshMaterial.side=THREE.DoubleSide;
    // create a multimaterial
    const mesh = createMultiMaterialObject(geom, [meshMaterial]);
    console.log(mesh);

    return mesh;
  }
}
