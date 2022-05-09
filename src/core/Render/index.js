/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-05 15:44:31
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-05 15:44:31
 * @Description: 渲染器类：初始化及相关方法
 */
import { WebGLRenderer } from "three";

class YRender {
  constructor() {
    this.renderer = undefined
  }

  init(w, h) {
    const renderer = new WebGLRenderer({
      antialias: true
    })
    renderer.setSize(w, h)
    document.getElementById('MB').appendChild(renderer.domElement)
    renderer.setClearColor(0x000000, 1.0)
    this.renderer = renderer
  }
}

export default new YRender()
