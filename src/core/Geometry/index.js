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
  CapsuleGeometry
} from "three";
import Yscene from "../Scene";
import Ycontrol from "../Control";

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

  createBox() {
    const geometry = new BoxGeometry(1, 1, 1)
    const meterial = new MeshBasicMaterial({color: 'red'})
    const box = new Mesh(geometry, meterial)
    box.position.x = 0
    box.position.y = 0.5
    box.position.z = 0
    Yscene.scene.add(box)
    Ycontrol.selected(box)
  }

  createCylinder() {
    const geometry = new CylinderGeometry(.5, .5, 1, 32)
    const meterial = new MeshBasicMaterial({color: 'red'})
    const cylinder = new Mesh(geometry, meterial)
    cylinder.position.x = 0
    cylinder.position.y = 0.5
    cylinder.position.z = 0
    Yscene.scene.add(cylinder)
    Ycontrol.selected(cylinder)
  }

  createCone() {
    const geometry = new ConeGeometry(.5, 1, 32 );
    const material = new MeshBasicMaterial({color: 'red'});
    const cone = new Mesh(geometry, material);
    cone.position.x = 0
    cone.position.y = 0.5
    cone.position.z = 0
    Yscene.scene.add(cone)
    Ycontrol.selected(cone)
  }

  createSphere() {
    const geometry = new SphereGeometry(.5, 32, 16)
    const material = new MeshBasicMaterial({color: 'red'})
    const sphere = new Mesh(geometry, material)
    sphere.position.x = 0
    sphere.position.y = 0.5
    sphere.position.z = 0
    Yscene.scene.add(sphere)
    Ycontrol.selected(sphere)
  }

  createIcosahedron() {
    const geometry = new IcosahedronGeometry(.5, 0)
    const meterial = new MeshBasicMaterial({color: 'red'})
    const icosahedron = new Mesh(geometry, meterial)
    icosahedron.position.x = 0
    icosahedron.position.y = 0.45
    icosahedron.position.z = 0
    Yscene.scene.add(icosahedron)
    Ycontrol.selected(icosahedron)
  }

  createCapsule() {
    const geometry = new CapsuleGeometry(.5, .5, 4, 8)
    const meterial = new MeshBasicMaterial({color: 'red'})
    const capsule = new Mesh(geometry, meterial)
    capsule.position.x = 0
    capsule.position.y = .72
    capsule.position.z = 0
    Yscene.scene.add(capsule)
    Ycontrol.selected(capsule)
  }
}

export default new YGeometry()
