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
import {
  ConeGeometry,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  Vector2,
  Vector3
} from "three";
import Ycamera from "../Camera";
import Yrender from "../Render";
import Yscene from "../Scene";
import eventBus from "../../tools/eventBus";

class YControl {
  constructor() {
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

  // 移除其他控件
  removeAnotherControllers() {
    for (let key in this.translateSystem) {
      Yscene.scene.remove(this.translateSystem[key])
    }
    for (let key in this.rotateSystem) {
      Yscene.scene.remove(this.rotateSystem[key])
    }
    for (let key in this.scaleSystem) {
      Yscene.scene.remove(this.scaleSystem[key])
    }
  }

  // 创建控件系统
  initControllerSystem(mesh) {
    this.targetMesh = mesh
    this.removeAnotherControllers()
    this.initTranslateSystem()
    document.getElementById("MB").style.cursor = "pointer"
    // 开启控件操作栏
    eventBus.emit("showController", 123)
  }

  // 创建平移系统
  initTranslateSystem() {
    this.removeAnotherControllers()
    Ycamera.camera.zoom = 50
    Ycamera.camera.updateProjectionMatrix()

    // 创建translateX
    const geo_cylinder_x = new CylinderGeometry(.05, .05, 1)
    const mate_cylinder_x = new MeshBasicMaterial({color: 'red'})
    const cylinder_x = new Mesh(geo_cylinder_x, mate_cylinder_x)
    cylinder_x.position.x = 1
    cylinder_x.position.y = this.targetMesh.position.y
    cylinder_x.position.z = 0
    cylinder_x.rotation.z = - 90 * Math.PI / 180
    const geo_cone_x = new ConeGeometry(.1, .5)
    const mate_cone_x = new MeshBasicMaterial({color: 'red'})
    const cone_x = new Mesh(geo_cone_x, mate_cone_x)
    cone_x.position.x = 1.5
    cone_x.position.y = this.targetMesh.position.y
    cone_x.position.z = 0
    cone_x.rotation.z = - 90 * Math.PI / 180
    const translateX = new Object3D()
    translateX.add(cylinder_x)
    translateX.add(cone_x)

    // 创建translateY
    const geo_cylinder_y = new CylinderGeometry(.05, .05, 1)
    const mate_cylinder_y = new MeshBasicMaterial({color: 'green'})
    const cylinder_y = new Mesh(geo_cylinder_y, mate_cylinder_y)
    cylinder_y.position.x = 0
    cylinder_y.position.y = 1.5
    cylinder_y.position.z = 0
    const geo_cone_y = new ConeGeometry(.1, .5)
    const mate_cone_y = new MeshBasicMaterial({color: 'green'})
    const cone_y = new Mesh(geo_cone_y, mate_cone_y)
    cone_y.position.x = 0
    cone_y.position.y = 2
    cone_y.position.z = 0
    const translateY = new Object3D()
    translateY.add(cylinder_y)
    translateY.add(cone_y)

    // 创建translateZ
    const geo_cylinder_z = new CylinderGeometry(.05, .05, 1)
    const mate_cylinder_z = new MeshBasicMaterial({color: 'blue'})
    const cylinder_z = new Mesh(geo_cylinder_z, mate_cylinder_z)
    cylinder_z.position.x = 0
    cylinder_z.position.y = this.targetMesh.position.y
    cylinder_z.position.z = 1
    cylinder_z.rotation.x = - 90 * Math.PI / 180
    const geo_cone_z = new ConeGeometry(.1, .5)
    const mate_cone_z = new MeshBasicMaterial({color: 'blue'})
    const cone_z = new Mesh(geo_cone_z, mate_cone_z)
    cone_z.position.x = 0
    cone_z.position.y = this.targetMesh.position.y
    cone_z.position.z = 1.5
    cone_z.rotation.x = 90 * Math.PI / 180
    const translateZ = new Object3D()
    translateZ.add(cylinder_z)
    translateZ.add(cone_z)

    this.translateSystem = {
      x: translateX,
      y: translateY,
      z: translateZ
    }

    // 渲染到场景
    Yscene.scene.add(translateX, translateY, translateZ)
  }

  // 创建旋转系统
  initRotateSystem() {
    this.removeAnotherControllers()
    Ycamera.camera.zoom = 50
    Ycamera.camera.updateProjectionMatrix()
    const geometry = new PlaneGeometry(5, 5)
    const meterial = new MeshBasicMaterial({color: "green"})
    const rotateSystem = new Mesh(geometry, meterial)
    rotateSystem.rotation.x = - 90 * Math.PI / 180
    rotateSystem.position.x = this.targetMesh.position.x
    rotateSystem.position.y = this.targetMesh.position.y
    rotateSystem.position.z = this.targetMesh.position.z

    Yscene.scene.add(rotateSystem)

    this.rotateSystem = {
      x: rotateSystem
    }
  }

  // 创建伸缩系统
  initScaleSystem() {
    this.removeAnotherControllers()
    Ycamera.camera.zoom = 50
    Ycamera.camera.updateProjectionMatrix()
    const geometry = new PlaneGeometry(5, 5)
    const meterial = new MeshBasicMaterial({color: "yellow"})
    const scaleSystem = new Mesh(geometry, meterial)
    scaleSystem.rotation.x = - 90 * Math.PI / 180
    scaleSystem.position.x = this.targetMesh.position.x
    scaleSystem.position.y = this.targetMesh.position.y
    scaleSystem.position.z = this.targetMesh.position.z

    Yscene.scene.add(scaleSystem)

    this.scaleSystem = {
      x: scaleSystem
    }
  }
}

export default new YControl()
