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
    this.scene = undefined
  }

  init() {
    const scene = new Scene()
    this.scene = scene
  }

  // TODO 用完删除
  initHelper() {
    const axes = new AxesHelper(200)
    this.scene.add(axes)
  }
}

export default new YScene()
