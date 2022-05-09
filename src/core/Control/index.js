/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-09 14:08:54
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-09 14:08:54
 * @Description: 控件类：提供控件方法
 */
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import {Vector2} from "three";
import Ycamera from "../Camera";
import Yrender from "../Render";
import Yscene from "../Scene";

class YControl {
  constructor() {
    this.control = null
    this.composer = null
    this.outlinePass = null
  }

  // 初始化视角控件
  initViewController() {
    const controls = new OrbitControls(Ycamera.camera, Yrender.renderer.domElement);
    controls.autoRotateSpeed = 0.2;
    controls.enableDamping = true;
    controls.dampingFactor = 0.4;
    controls.enableZoom = true;
    controls.minDistance = 5;
    controls.maxDistance = 1000;
    this.control = controls
  }

  selected(obj) {
    this.outlinePass.selectedObjects = [obj]
    this.composer.render(Yscene.scene, Ycamera.camera)
  }

  // 初始化几何体选中控件
  initControllerSystem() {
    // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
    const composer = new EffectComposer(Yrender.renderer)
    // 新建一个场景通道  为了覆盖到原理来的场景上
    const renderPass = new RenderPass(Yscene.scene, Ycamera.camera)
    composer.addPass(renderPass)
    // 物体边缘发光通道
    const MB = document.getElementById("MB")
    const outlinePass = new OutlinePass(
      new Vector2(MB.clientWidth, MB.clientHeight),
      Yscene.scene,
      Ycamera.camera,
    )
    composer.addPass(outlinePass)
    outlinePass.renderToScreen = true
    outlinePass.edgeStrength = 10.0 // 边框的亮度
    outlinePass.edgeGlow = 1 // 光晕[0,1]
    outlinePass.usePatternTexture = false // 是否使用父级的材质
    outlinePass.edgeThickness = .5 // 边框宽度
    outlinePass.downSampleRatio = 1 // 边框弯曲度
    outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
    outlinePass.visibleEdgeColor.set(0xffffff) // 呼吸显示的颜色
    outlinePass.hiddenEdgeColor.set(0xff00ff) // 呼吸消失的颜色
    outlinePass.clear = true
    this.outlinePass = outlinePass
    this.composer = composer
  }

  // 创建伸缩系统
  initScaleSystem() {

  }

  // 创建平移系统
  initTranslateSystem() {

  }

  // 创建旋转系统
  initRotateSystem() {

  }
}

export default new YControl()
