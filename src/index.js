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
import iconTranslate from "./assets/icon/translate.png";
import iconTranslateChoose from "./assets/icon/translateChoose.png";
import iconRotate from "./assets/icon/rotate.png";
import iconRotateChoose from "./assets/icon/rotateChoose.png";
import iconScale from "./assets/icon/scale.png";
import iconScaleChoose from "./assets/icon/scaleChoose.png";
import iconCancel from "./assets/icon/cancel.png";
import eventBus from "./tools/eventBus";

let clock = new Clock()

class MB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      axesVisible: false,
      gridVisible: true,
      controlVisible: "none",
      meshListVisible: "none",
      physicListVisible: "none",
      layerListVisible: "none",
      controlType: "translate" // 控件类型：默认平移
    }
  }

  draw(w, h) {
    Ycamera.init(w, h)
    Yrenderer.init(w, h)
    Yscene.init()
    Ylight.init()
    Yfloor.init()
    Ycontrol.initViewController()
    Ycontrol.initOutlinePass()
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
    eventBus.on("showController", () => {
      this.setState({
        controlVisible: "block",
        controlType: "translate"
      })
    })
    this.draw(width, height)
  }

  componentWillUnmount() {
    eventBus.off("showController")
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

  switchController(type) {
    this.setState({
      controlType: type
    })
    switch (type) {
      case "translate":
        Ycontrol.initTranslateSystem()
        break
      case "rotate":
        Ycontrol.initRotateSystem()
        break
      case "scale":
        Ycontrol.initScaleSystem()
        break
    }
    document.getElementById("MB").style.cursor = "pointer"
  }

  clearControl() {
    this.setState({
      controlType: ""
    })
    Ycontrol.removeAnotherControllers()
    document.getElementById("MB").style.cursor = "default"
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

        {/* 控件区域 */}
        <div className="meshController" style={{display: this.state.controlVisible}}>
          <button
            className={this.state.controlType === 'translate' ? "activeButton" : ""}
            onClick={() => this.switchController('translate')}
          >
            <img src={this.state.controlType === 'translate' ? iconTranslateChoose : iconTranslate} alt=""/>
          </button>
          <button
            className={this.state.controlType === 'rotate' ? "activeButton" : ""}
            onClick={() => this.switchController('rotate')}
          >
            <img src={this.state.controlType === 'rotate' ? iconRotateChoose : iconRotate} alt=""/>
          </button>
          <button
            className={this.state.controlType === 'scale' ? "activeButton" : ""}
            onClick={() => this.switchController('scale')}
          >
            <img src={this.state.controlType === 'scale' ? iconScaleChoose : iconScale} alt=""/>
          </button>
          <button onClick={() => this.clearControl()}>
            <img src={iconCancel} alt=""/>
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MB />,
  document.getElementById('root')
);
