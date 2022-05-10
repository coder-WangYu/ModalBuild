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
import Ycontrol from "../Control";

class YEvents {
  // 监听视口拉伸事件
  initWindowResize() {
    window.addEventListener("resize", () => {
      Ycamera.camera.aspect = window.innerWidth / window.innerHeight
      Ycamera.camera.updateProjectionMatrix()
      Yrender.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  // 射线法选中几何体
  initThreeClickEvent(wrapper) {
    // 创建射线
    const raycaster = new Raycaster()
    // 创建矢量坐标
    const pointer = new Vector2()
    // 开启鼠标按下事件监听
    wrapper.addEventListener("click", onWrapperMousedown, false)
    // 事件逻辑
    function onWrapperMousedown(e) {
      e.preventDefault()
      pointer.x = (e.clientX / Yrender.renderer.domElement.clientWidth) * 2 - 1;
      pointer.y = -(e.clientY / Yrender.renderer.domElement.clientHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, Ycamera.camera)
      const intersects = raycaster.intersectObjects(Yscene.scene.children);
      const nearMesh = intersects[0] // 距离最近的几何体
      // 添加选中效果
      if (nearMesh && nearMesh.object.type === "Mesh") {
        Ycontrol.selected(nearMesh.object)
      }
    }
  }
}

export default new YEvents()
