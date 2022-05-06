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
import { Tooltip } from "antd";
import iconAdd from "./assets/img/controllers/add.svg";
import iconReduce from "./assets/img/controllers/reduce.svg";
import iconHand from "./assets/img/controllers/hand.svg";
import iconHandChoose from "./assets/img/controllers/hand-choose.svg";
import iconTop from "./assets/img/controllers/top.svg";
import iconTopChoose from "./assets/img/controllers/top-choose.svg";
import iconRight from "./assets/img/controllers/right.svg";
import iconRightChoose from "./assets/img/controllers/right-choose.svg";
import iconBottom from "./assets/img/controllers/bottom.svg";
import iconBottomChoose from "./assets/img/controllers/bottom-choose.svg";
import iconLeft from "./assets/img/controllers/left.svg";
import iconLeftChoose from "./assets/img/controllers/left-choose.svg";

class MB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handChoose: false,
      viewChoose: ""
    }
  }

  draw(w, h) {
    Ycamera.init(w, h)
    Yrenderer.init(w, h)
    Yscene.init()
    // TODO 坐标系辅助 用完删除
    Yscene.initHelper()
    Ylight.init()
    Yfloor.init()
    Ygeometry.initMainLeft(["MLbox", "MLcylinder", "MLcone", "MLsphere", "MLtorus", "MLicosahedron", "MLcapsule"])
    Yevents.initThreeClickEvent(document.getElementById('MB'))
    Yevents.initViewMouseDownEvent("totop", "toright", "tobottom", "toleft")
    Yrenderer.renderer.render(Yscene.scene, Ycamera.camera)
  }

  componentDidMount() {
    const width = document.getElementById('MB').clientWidth
    const height = document.getElementById('MB').clientHeight
    this.draw(width, height)
  }

  switchHand() {
    const MB = document.getElementById("MB")
    this.state.handChoose = !this.state.handChoose
    if (this.state.handChoose) {
      MB.style.cursor = "pointer"
      Yevents.initCanvasDragEvent()
    } else {
      MB.style.cursor = "default"
      Yevents.dispatchCanvasDragEvent()
    }
    this.setState({
      handChoose: this.state.handChoose
    })
  }

  switchView(view) {
    this.state.viewChoose = view
    this.setState({
      viewChoose: this.state.viewChoose
    })
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
      case "torus":
        Ygeometry.createTorus()
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
          <Tooltip placement="bottom" title="拖拽画布">
            <div className="btnItem" onClick={() => this.switchHand()}>
              <img src={this.state.handChoose ? iconHandChoose : iconHand} alt=""/>
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title="放大场景">
            <div className="btnItem" onClick={() => Ycamera.zoomAdd()}>
              <img src={iconAdd} alt=""/>
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title="缩小场景">
            <div className="btnItem" onClick={() => Ycamera.zoomReduce()}>
              <img src={iconReduce} alt=""/>
            </div>
          </Tooltip>
        </div>

        {/* 几何体区域 */}
        <div id="mainLeft">
          <div id="MLbox" className="geometryItem" onClick={() => this.createMesh('box')}/>
          <div id="MLcylinder" className="geometryItem" onClick={() => this.createMesh('cylinder')}/>
          <div id="MLcone" className="geometryItem" onClick={() => this.createMesh('cone')}/>
          <div id="MLsphere" className="geometryItem" onClick={() => this.createMesh('sphere')}/>
          <div id="MLtorus" className="geometryItem" onClick={() => this.createMesh('torus')}/>
          <div id="MLicosahedron" className="geometryItem" onClick={() => this.createMesh('icosahedron')}/>
          <div id="MLcapsule"className="geometryItem" onClick={() => this.createMesh('capsule')}/>
        </div>

        {/* 图层区域 */}
        <div id="mainRight"></div>

        {/* 视角控件 */}
        <div id="viewControl">
          <div
            id="totop"
            onMouseDown={() => this.switchView('totop')}
            onMouseUp={() => this.switchView("")}
          >
            <img src={this.state.viewChoose === 'totop' ? iconTopChoose : iconTop} alt=""/>
          </div>
          <div
            id="toright"
            onMouseDown={() => this.switchView('toright')}
            onMouseUp={() => this.switchView("")}
          >
            <img src={this.state.viewChoose === 'toright' ? iconRightChoose : iconRight} alt=""/>
          </div>
          <div
            id="tobottom"
            onMouseDown={() => this.switchView('tobottom')}
            onMouseUp={() => this.switchView("")}
          >
            <img src={this.state.viewChoose === 'tobottom' ? iconBottomChoose : iconBottom} alt=""/>
          </div>
          <div
            id="toleft"
            onMouseDown={() => this.switchView('toleft')}
            onMouseUp={() => this.switchView("")}
          >
            <img src={this.state.viewChoose === 'toleft' ? iconLeftChoose : iconLeft} alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MB />,
  document.getElementById('root')
);
