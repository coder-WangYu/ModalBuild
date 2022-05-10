/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-05 15:52:16
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-05 15:52:16
 * @Description: 场景类：场景及相关方法
 */
import {AxesHelper, Scene} from "three";
class YScene {
  constructor() {
    this.scene = null
    this.axes = null
  }

  init() {
    const scene = new Scene()
    this.scene = scene
    this.showAxes()
  }

  showAxes() {
    this.axes = new AxesHelper(200)
    this.scene.add(this.axes)
  }

  hiddenAxes() {
    this.scene.remove(this.axes)
  }
}

export default new YScene()
