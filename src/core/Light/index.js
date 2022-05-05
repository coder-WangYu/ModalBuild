/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-05 16:00:34
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-05 16:00:34
 * @Description: 光源类：光源及相关方法
 */
import { DirectionalLight } from "three";
import Yscene from "../Scene";

class YLight {
  constructor() {
    this.light = undefined
  }

  init() {
    const light = new DirectionalLight(0xFF0000, 1.0, 0)
    light.position.set(100, 100, 200)
    Yscene.scene.add(light)
    this.light = light
  }
}

export default new YLight()
