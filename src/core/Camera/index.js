/**
 * @Editor：WYDX
 * @CreateTime: 2022年05月05日15:20:22
 * @LastEditor: WYDX
 * @LastEditTime: 2022年05月05日15:20:22
 * @Description: 相机类：初始化相机及相关方法
 */
import { OrthographicCamera } from "three";
import Yrender from "../Render/index";
import Yscene from "../Scene";

class YCamera {
  constructor() {
    this.camera = undefined
    this.zoom = 2 // 初始变焦倍数
  }

  init(w, h) {
    let camera = new OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 1, 1000)
    camera.position.x = -100
    camera.position.y = 150
    camera.position.z = 200

    camera.lookAt(0, 0, 0)
    // 场景变焦到2倍
    camera.zoom = this.zoom
    camera.updateProjectionMatrix()
    this.camera = camera
  }

  // 增加变焦倍数
  zoomAdd() {
    if (this.zoom === 40) {
      return
    }
    this.zoom ++
    this.camera.zoom += 2
    this.camera.updateProjectionMatrix()
    Yrender.renderer.render(Yscene.scene, this.camera)
  }

  // 减少变焦倍数
  zoomReduce() {
    if (this.zoom === 2) {
      return
    }
    this.zoom --
    this.camera.zoom -= 2
    this.camera.updateProjectionMatrix()
    Yrender.renderer.render(Yscene.scene, this.camera)
  }
}

export default new YCamera()
