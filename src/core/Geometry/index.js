/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-06 10:23:19
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-06 10:23:19
 * @Description: 几何体类：几何体相关方法
 */
import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  OrthographicCamera,
  Scene,
  CylinderGeometry,
  ConeGeometry,
  SphereGeometry,
  TorusGeometry,
  IcosahedronGeometry,
  CapsuleGeometry,
  Vector2,
  Color
} from "three";
import Yscene from "../Scene";
import Ycamera from "../Camera";
import Yrender from "../Render";
import {OutlinePass} from "three/examples/jsm/postprocessing/OutlinePass";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {FXAAShader} from "three/examples/jsm/shaders/FXAAShader";

class YGeometry {
  // 创建左边栏几何体菜单
  initMainLeft(ids) {
    // 获取单元格宽高
    const width = document.getElementById("MLbox").clientWidth
    const height = document.getElementById("MLbox").clientHeight

    // 遍历单元格id并创建mesh
    ids.forEach(id => {
      switch (id) {
        case "MLbox":
          const box_geometry = new BoxGeometry(4, 4, 4)
          const box_meterial = new MeshBasicMaterial({color: 'blue'})
          const box = new Mesh(box_geometry, box_meterial)
          initMainLeftMesh(id, box)
          break
        case "MLcylinder":
          const cylinder_geometry = new CylinderGeometry(2.5, 2.5, 4, 32)
          const cylinder_meterial = new MeshBasicMaterial({color: 'blue'})
          const cylinder = new Mesh(cylinder_geometry, cylinder_meterial)
          initMainLeftMesh(id, cylinder)
          break
        case "MLcone":
          const cone_geometry = new ConeGeometry(2.5, 4, 32 );
          const cone_material = new MeshBasicMaterial({color: 'blue'});
          const cone = new Mesh(cone_geometry, cone_material);
          initMainLeftMesh(id, cone)
          break
        case "MLsphere":
          const sphere_geometry = new SphereGeometry(3, 32, 16)
          const sphere_material = new MeshBasicMaterial({color: 'blue'})
          const sphere = new Mesh(sphere_geometry, sphere_material)
          initMainLeftMesh(id, sphere)
          break
        case "MLtorus":
          const torus_geometry = new TorusGeometry(2.5, 1, 16, 100)
          const torus_material = new MeshBasicMaterial({color: 'blue'})
          const torus = new Mesh(torus_geometry, torus_material)
          initMainLeftMesh(id, torus)
          break
        case "MLicosahedron":
          const icosahedron_geometry = new IcosahedronGeometry(3, 0)
          const icosahedron_meterial = new MeshBasicMaterial({color: 'blue'})
          const icosahedron = new Mesh(icosahedron_geometry, icosahedron_meterial)
          initMainLeftMesh(id, icosahedron)
          break
        case "MLcapsule":
          const capsule_geometry = new CapsuleGeometry(2.5, 1, 4, 8)
          const capsule_meterial = new MeshBasicMaterial({color: 'blue'})
          const capsule = new Mesh(capsule_geometry, capsule_meterial)
          initMainLeftMesh(id, capsule)
          break
      }
    })

    // 渲染单元格中的mesh
    function initMainLeftMesh(id, mesh) {
      if (!id || !mesh) {
        return
      }
      const scene = new Scene()
      scene.add(mesh)
      const camera = new OrthographicCamera(width / -2, width / 2, height / -2, height / 2, 1, 1000)
      camera.position.x = 1
      camera.position.y = 2
      camera.position.z = 2
      camera.lookAt(0, 0, 0)
      camera.zoom = 13
      camera.updateProjectionMatrix()
      const renderer = new WebGLRenderer({
        antialias: true
      })
      renderer.setSize(width, height)
      document.getElementById(id).appendChild(renderer.domElement)
      renderer.setClearColor(0xffffff, 1)

      function animate() {
        mesh.rotation.y += .01
        mesh.rotation.z += .01
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    }
    initMainLeftMesh()
  }

  // 创建控件系统
  initControllerSystem(mesh) {
    // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
    const composer = new EffectComposer(Yrender.renderer)
    // 新建一个场景通道  为了覆盖到原理来的场景上
    const renderPass = new RenderPass(Yscene.scene, Ycamera.camera)
    composer.addPass(renderPass)
    // 物体边缘发光通道
    const outlinePass = new OutlinePass(
      new Vector2(window.innerWidth, window.innerHeight),
      Yscene.scene,
      Ycamera.camera,
      mesh
    )
    outlinePass.selectedObjects = mesh
    outlinePass.edgeStrength = 10.0 // 边框的亮度
    outlinePass.edgeGlow = 1// 光晕[0,1]
    outlinePass.usePatternTexture = false // 是否使用父级的材质
    outlinePass.edgeThickness = 1.0 // 边框宽度
    outlinePass.downSampleRatio = 1 // 边框弯曲度
    outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
    outlinePass.visibleEdgeColor.set(parseInt(0x00ff00)) // 呼吸显示的颜色
    outlinePass.hiddenEdgeColor = new Color(0, 0, 0) // 呼吸消失的颜色
    outlinePass.clear = true
    composer.addPass(outlinePass)
    // 自定义的着色器通道 作为参数
    const effectFXAA = new ShaderPass(FXAAShader)
    effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
    effectFXAA.renderToScreen = true
    composer.addPass(effectFXAA)

    // 渲染
    function animate () {
      Yrender.renderer.render(Yscene.scene, Ycamera.camera);
      //scene.rotateY(0.01);//每次绕y轴旋转0.01弧度
      requestAnimationFrame(animate);
      if (composer) {
        composer.render()
      }
    }
    animate()
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

  createBox() {
    const geometry = new BoxGeometry(6, 6, 6)
    const meterial = new MeshBasicMaterial({color: 'red'})
    const box = new Mesh(geometry, meterial)
    box.position.x = 0
    box.position.y = 4.2
    box.position.z = 0
    Yscene.scene.add(box)

  }

  createCylinder() {
    const geometry = new CylinderGeometry(4, 4, 6, 32)
    const meterial = new MeshBasicMaterial({color: 'red'})
    const cylinder = new Mesh(geometry, meterial)
    cylinder.position.x = 0
    cylinder.position.y = 4.2
    cylinder.position.z = 0
    Yscene.scene.add(cylinder)
  }

  createCone() {
    const geometry = new ConeGeometry(4, 6, 32 );
    const material = new MeshBasicMaterial({color: 'red'});
    const cone = new Mesh(geometry, material);
    cone.position.x = 0
    cone.position.y = 4.2
    cone.position.z = 0
    Yscene.scene.add(cone)
  }

  createSphere() {
    const geometry = new SphereGeometry(4, 32, 16)
    const material = new MeshBasicMaterial({color: 'red'})
    const sphere = new Mesh(geometry, material)
    sphere.position.x = 0
    sphere.position.y = 4.2
    sphere.position.z = 0
    Yscene.scene.add(sphere)
  }

  createTorus() {
    const geometry = new TorusGeometry(4, 1, 16, 100)
    const material = new MeshBasicMaterial({color: 'red'})
    const torus = new Mesh(geometry, material)
    torus.position.x = 0
    torus.position.y = 4.2
    torus.position.z = 0
    Yscene.scene.add(torus)
  }

  createIcosahedron() {
    const geometry = new IcosahedronGeometry(4, 0)
    const meterial = new MeshBasicMaterial({color: 'red'})
    const icosahedron = new Mesh(geometry, meterial)
    icosahedron.position.x = 0
    icosahedron.position.y = 4.2
    icosahedron.position.z = 0
    Yscene.scene.add(icosahedron)
  }

  createCapsule() {
    const geometry = new CapsuleGeometry(4, 1, 4, 8)
    const meterial = new MeshBasicMaterial({color: 'red'})
    const capsule = new Mesh(geometry, meterial)
    capsule.position.x = 0
    capsule.position.y = 4.2
    capsule.position.z = 0
    Yscene.scene.add(capsule)
  }
}

export default new YGeometry()
