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
  BoxGeometry,
  TextureLoader
} from "three";
import Yscene from "../Scene";
import Ycamera from "../Camera";
import Yrender from "../Render";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import brickTexture from "../../assets/img/texture/brick.png";

class YFloor {
  constructor() {
    this.floor = undefined
  }

  init() {
    const bricks = [], geometries = []
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const brick_geometry = new BoxGeometry(4, 4, 2)
        const brick_meterial = new MeshBasicMaterial()
        const brick = new Mesh(brick_geometry, brick_meterial)
        brick.position.x = i * 4
        brick.position.y = j * 4
        bricks.push(brick)
      }
    }

    bricks.forEach(brick => {
      brick.updateMatrix()
      const newGeometry = brick.geometry.applyMatrix4(brick.matrix)
      geometries.push(newGeometry)
    })
    const brick_texture = new TextureLoader().load(brickTexture)
    const bufferGeometry = mergeBufferGeometries(geometries)
    const meterial = new MeshBasicMaterial({
      color: 0xe6e6e6,
      opacity: .1,
      map: brick_texture
    })
    const floor = new Mesh(bufferGeometry, meterial)
    floor.position.x = -200
    floor.position.y = 0
    floor.position.z = -200
    floor.rotation.x = 90 * Math.PI / 180 // PI在数学方法中为π，而此时的π在角度里为180°，Math.PI/180就为1°
    Yscene.scene.add(floor)
    this.floor = floor

    function animate() {
      requestAnimationFrame(animate)
      Yrender.renderer.render(Yscene.scene, Ycamera.camera)
    }
    animate()
  }
}

export default new YFloor()
