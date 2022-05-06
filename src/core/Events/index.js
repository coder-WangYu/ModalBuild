/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-06 09:38:46
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-06 09:38:46
 * @Description: 事件类：Three相关事件
 */
import { Raycaster, Vector2 } from "three";
import Yrender from "../Render";
import Ycamera from "../Camera";
import Yscene from "../Scene";

class YEvents {
  initThreeClickEvent(wrapper) {
    // 创建射线
    const raycaster = new Raycaster()
    // 创建矢量坐标
    const pointer = new Vector2()
    // 开启鼠标按下事件监听
    wrapper.addEventListener("pointermove", onWrapperMousedown, false)
    // 事件逻辑 TODO 完善事件
    function onWrapperMousedown(e) {
      e.preventDefault()
      pointer.x = (e.clientX / Yrender.renderer.domElement.clientWidth) * 2 - 1;
      pointer.y = -(e.clientY / Yrender.renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, Ycamera.camera)
      // console.log(Yscene)
      const intersects = raycaster.intersectObjects(Yscene.scene.children);
      // console.log(intersects)
    }
  }
}

export default new YEvents()
