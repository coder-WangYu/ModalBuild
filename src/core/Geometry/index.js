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
  CylinderGeometry, ConeGeometry, SphereGeometry, TorusGeometry, IcosahedronGeometry, CapsuleGeometry
} from "three";
import Yscene from "../Scene";

class YGeometry {
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

  initBox() {
    const geometry = new BoxGeometry(10, 10, 10)
    const meterial = new MeshBasicMaterial({
      color: 0xff0000
    })
    const cube = new Mesh(geometry, meterial)
    Yscene.scene.add(cube)
  }
}

export default new YGeometry()
