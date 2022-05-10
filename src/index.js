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
import {Tooltip, Button} from "antd";
import iconAxes from "./assets/icon/axes.png";
import iconAxesChoose from "./assets/icon/axesChoose.png";
import iconGrid from "./assets/icon/grid.png";
import iconGridChoose from "./assets/icon/gridChoose.png";

let clock = new Clock()

class MB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      axesVisible: false,
      gridVisible: false,
      meshListVisible: "none",
      physicListVisible: "none",
      layerListVisible: "none"
    }
    this.clock = new Clock()
  }

  draw(w, h) {
    Ycamera.init(w, h)
    Yrenderer.init(w, h)
    Yscene.init()
    Ylight.init()
    Yfloor.init()
    Ycontrol.initViewController()
    Ycontrol.initControllerSystem()
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

  switchAxes() {
    this.state.axesVisible = !this.state.axesVisible
    this.state.axesVisible
      ? Yscene.showAxes()
      : Yscene.hiddenAxes()
    this.setState({
      axesVisible: this.state.axesVisible
    })
  }

  switchGrid() {
    this.state.gridVisible = !this.state.gridVisible
    this.state.gridVisible
      ? Yfloor.showGrid()
      : Yfloor.hiddenGrid()
    this.setState({
      gridVisible: this.state.gridVisible
    })
  }

  switchMeshList() {
    this.setState({
      meshListVisible: "block",
      physicListVisible: "none"
    }, () => {
      if (!Ygeometry.meshList) {
        Ygeometry.initMeshList(["MLbox", "MLcylinder", "MLcone", "MLsphere", "MLtorus", "MLicosahedron", "MLcapsule"])
      }
    })
  }

  switchPhysicList() {
    this.setState({
      meshListVisible: "none",
      physicListVisible: "block"
    }, () => {
      Ygeometry.initPhysicList(["MLbox", "MLcylinder", "MLcone"])
    })
  }

  switchListLeft() {
    this.setState({
      meshListVisible: "none",
      physicListVisible: "none"
    })
  }

  switchLayerList() {
    this.setState({
      layerListVisible: "block"
    })
  }

  switchListRight() {
    this.setState({
      layerListVisible: "none"
    })
  }

  render() {
    return (
      <div id="MB">
        {/* 控件区域 */}
        <div id="mainTop">
          <Tooltip placement="bottom" title="开启/关闭地面栅格辅助">
            <div className="btnItem" onClick={() => this.switchGrid()}>
              <img src={this.state.gridVisible ? iconGridChoose : iconGrid} alt=""/>
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title="开启/关闭坐标轴辅助">
            <div className="btnItem" onClick={() => this.switchAxes()}>
              <img src={this.state.axesVisible ? iconAxesChoose : iconAxes} alt=""/>
            </div>
          </Tooltip>
        </div>

        {/* 几何体区域 */}
        <div className="buttonControlLeft">
          <Tooltip placement="top" title="开启/关闭几何体列表">
            <Button onClick={() => this.switchMeshList()}>几何体</Button>
          </Tooltip>
          <Tooltip placement="top" title="开启/关闭物理引擎列表">
            <Button onClick={() => this.switchPhysicList()}>物理引擎</Button>
          </Tooltip>
          <Tooltip placement="top" title="隐藏列表">
            <Button onClick={() => this.switchListLeft()}>×</Button>
          </Tooltip>
        </div>
        <div id="meshList" style={{display: this.state.meshListVisible}}>
          <div id="MLbox" className="geometryItem" onClick={() => this.createMesh('box')}/>
          <div id="MLcylinder" className="geometryItem" onClick={() => this.createMesh('cylinder')}/>
          <div id="MLcone" className="geometryItem" onClick={() => this.createMesh('cone')}/>
          <div id="MLsphere" className="geometryItem" onClick={() => this.createMesh('sphere')}/>
          <div id="MLicosahedron" className="geometryItem" onClick={() => this.createMesh('icosahedron')}/>
          <div id="MLcapsule"className="geometryItem" onClick={() => this.createMesh('capsule')}/>
        </div>
        {/* 物理引擎区域 */}
        <div id="physicList" style={{display: this.state.physicListVisible}}>
          {/* TODO 添加物理引擎 */}
          <div className="geometryItem">
            待开发...
          </div>
        </div>

        {/* 图层区域 */}
        <div className="buttonControlRight">
          <Tooltip placement="top" title="开启/关闭图层列表">
            <Button onClick={() => this.switchLayerList()}>图层</Button>
          </Tooltip>
          <Tooltip placement="top" title="隐藏列表">
            <Button onClick={() => this.switchListRight()}>×</Button>
          </Tooltip>
        </div>
        <div id="layerList" style={{display: this.state.layerListVisible}}>

        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MB />,
  document.getElementById('root')
);
