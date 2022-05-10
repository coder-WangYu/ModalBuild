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
import {Mesh, MeshBasicMaterial, PlaneGeometry, Vector2} from "three";
import Ycamera from "../Camera";
import Yrender from "../Render";
import Yscene from "../Scene";
import eventBus from "../../tools/eventBus";

class YControl {
  constructor() {
    this.control = null
    this.composer = null
    this.outlinePass = null
    this.targetMesh = null
    this.translateSystem = null
    this.rotateSystem = null
    this.scaleSystem = null
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
    this.initControllerSystem(obj)
  }

  // 创建控件系统
  initOutlinePass() {
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

  // 创建控件系统
  initControllerSystem(mesh) {
    this.targetMesh = mesh
    this.translateSystem = null
    this.rotateSystem = null
    this.scaleSystem = null
    this.initTranslateSystem()
    document.getElementById("MB").style.cursor = "pointer"
    // 开启控件操作栏
    eventBus.emit("showController", 123)
  }

  // 创建平移系统
  initTranslateSystem() {
    if (this.translateSystem) {
      Yscene.scene.remove(this.translateSystem)
    }
    Ycamera.camera.zoom = 50
    Ycamera.camera.updateProjectionMatrix()
    const geometry = new PlaneGeometry(5, 5)
    const meterial = new MeshBasicMaterial({color: "blue"})
    const translateSystem = new Mesh(geometry, meterial)
    translateSystem.rotation.x = - 90 * Math.PI / 180
    translateSystem.position.x = this.targetMesh.position.x
    translateSystem.position.y = this.targetMesh.position.y
    translateSystem.position.z = this.targetMesh.position.z
    this.translateSystem = translateSystem
    Yscene.scene.add(translateSystem)
  }

  // 创建旋转系统
  initRotateSystem() {
    if (this.rotateSystem) {
      Yscene.scene.remove(this.rotateSystem)
    }
    Ycamera.camera.zoom = 50
    Ycamera.camera.updateProjectionMatrix()
    const geometry = new PlaneGeometry(5, 5)
    const meterial = new MeshBasicMaterial({color: "green"})
    const rotateSystem = new Mesh(geometry, meterial)
    rotateSystem.rotation.x = - 90 * Math.PI / 180
    rotateSystem.position.x = this.targetMesh.position.x
    rotateSystem.position.y = this.targetMesh.position.y
    rotateSystem.position.z = this.targetMesh.position.z
    this.rotateSystem = rotateSystem
    Yscene.scene.add(rotateSystem)
  }

  // 创建伸缩系统
  initScaleSystem() {
    if (this.scaleSystem) {
      Yscene.scene.remove(this.scaleSystem)
    }
    Ycamera.camera.zoom = 50
    Ycamera.camera.updateProjectionMatrix()
    const geometry = new PlaneGeometry(5, 5)
    const meterial = new MeshBasicMaterial({color: "yellow"})
    const scaleSystem = new Mesh(geometry, meterial)
    scaleSystem.rotation.x = - 90 * Math.PI / 180
    scaleSystem.position.x = this.targetMesh.position.x
    scaleSystem.position.y = this.targetMesh.position.y
    scaleSystem.position.z = this.targetMesh.position.z
    this.scaleSystem = scaleSystem
    Yscene.scene.add(scaleSystem)
  }
}

export default new YControl()
