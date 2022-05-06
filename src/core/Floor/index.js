/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-05 16:04:26
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-05 16:04:26
 * @Description: 地面类：地面及相关方法
 */
import {
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh
} from "three";
import Yscene from "../Scene";

class YFloor {
  constructor() {
    this.floor = undefined
  }

  init() {
    const geometry = new PlaneGeometry(400, 400, 200, 200)
    const meterial = new MeshBasicMaterial({
      wireframe: true,
      color: 0xaaaaaa,
    })
    const floor = new Mesh(geometry, meterial)
    floor.rotation.x = 90 * Math.PI / 180 // PI在数学方法中为π，而此时的π在角度里为180°，Math.PI/180就为1°
    Yscene.scene.add(floor)
    this.floor = floor
  }
}

export default new YFloor()
