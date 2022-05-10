/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-05 16:04:26
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-05 16:04:26
 * @Description: 地面类：地面及相关方法
 */
import {
  MeshBasicMaterial,
  Mesh,
  GridHelper,
  PlaneGeometry,
  DoubleSide
} from "three";
import Yscene from "../Scene";

class YFloor {
  constructor() {
    this.floor = null
    this.grid = null
  }

  init() {
    const floor_geometry = new PlaneGeometry(400, 400)
    const floor_material = new MeshBasicMaterial({
      color: 0x111111,
      side: DoubleSide
    })
    const floor = new Mesh(floor_geometry, floor_material)
    floor.name = "FLOOR"
    floor.position.y = -0.01
    floor.rotation.x = -90 * Math.PI / 180
    Yscene.scene.add(floor)
    this.floor = floor
    this.showGrid()
  }

  showGrid() {
    const grid = new GridHelper(400, 400, 0xffffff, 0xffffff)
    grid.material.transparent = true;
    grid.material.opacity = 0.3;
    Yscene.scene.add(grid)
    this.grid = grid
  }

  hiddenGrid() {
    Yscene.scene.remove(this.grid)
  }
}

export default new YFloor()
