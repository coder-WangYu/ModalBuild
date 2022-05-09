/**
 * @Editor：WYDX
 * @CreateTime: 2022-05-05 15:47:16
 * @LastEditor: WYDX
 * @LastEditTime: 2022-05-05 15:47:16
 * @Description: 场景初始化
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Ycamera from "./core/Camera";
import Yrenderer from "./core/Render";
import Yscene from "./core/Scene";
import Ylight from "./core/Light";
import Yfloor from "./core/Floor";
import Yevents from "./core/Events";
import Ygeometry from "./core/Geometry";
import Ycontrol from "./core/Control";
import { Clock } from "three";

let clock = new Clock()

class MB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handChoose: false,
      viewChoose: ""
    }
    this.clock = new Clock()
  }

  draw(w, h) {
    Ycamera.init(w, h)
    Yrenderer.init(w, h)
    Yscene.init()
    // TODO 坐标系辅助 用完删除
    Yscene.initHelper()
    Ylight.init()
    Yfloor.init()
    Ycontrol.initViewController()
    Ycontrol.initControllerSystem()
    Ygeometry.initMainLeft(["MLbox", "MLcylinder", "MLcone", "MLsphere", "MLtorus", "MLicosahedron", "MLcapsule"])
    Yevents.initWindowResize()
    Yevents.initThreeClickEvent(document.getElementById('MB'))
    Yrenderer.renderer.render(Yscene.scene, Ycamera.camera)
    animate()

    function animate() {
      const delta = clock.getDelta()
      requestAnimationFrame(animate)
      Ycontrol.composer.render(delta)
    }
  }

  componentDidMount() {
    const width = document.getElementById('MB').clientWidth
    const height = document.getElementById('MB').clientHeight
    this.draw(width, height)
  }

  createMesh(type) {
    switch (type) {
      case "box":
        Ygeometry.createBox()
        break
      case "cylinder":
        Ygeometry.createCylinder()
        break
      case "cone":
        Ygeometry.createCone()
        break
      case "sphere":
        Ygeometry.createSphere()
        break
      case "icosahedron":
        Ygeometry.createIcosahedron()
        break
      case "capsule":
        Ygeometry.createCapsule()
        break
    }
    Yrenderer.renderer.render(Yscene.scene, Ycamera.camera)
  }

  render() {
    return (
      <div id="MB">
        {/* 控件区域 */}
        <div id="mainTop">

        </div>

        {/* 几何体区域 */}
        <div id="mainLeft">
          <div id="MLbox" className="geometryItem" onClick={() => this.createMesh('box')}/>
          <div id="MLcylinder" className="geometryItem" onClick={() => this.createMesh('cylinder')}/>
          <div id="MLcone" className="geometryItem" onClick={() => this.createMesh('cone')}/>
          <div id="MLsphere" className="geometryItem" onClick={() => this.createMesh('sphere')}/>
          <div id="MLicosahedron" className="geometryItem" onClick={() => this.createMesh('icosahedron')}/>
          <div id="MLcapsule"className="geometryItem" onClick={() => this.createMesh('capsule')}/>
        </div>

        {/* 图层区域 */}
        <div id="mainRight"></div>
      </div>
    );
  }
}

ReactDOM.render(
  <MB />,
  document.getElementById('root')
);
