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

class MB extends Component {
  draw(w, h) {
    Ycamera.init(w, h)
    Yrenderer.init(w, h)
    Yscene.init()
    Ylight.init()
    Yfloor.init()
    Ygeometry.initMainLeft(["MLbox", "MLcylinder", "MLcone", "MLsphere", "MLtorus", "MLicosahedron", "MLcapsule"])
    Yevents.initThreeClickEvent(document.getElementById('MB'))
    Yrenderer.renderer.render(Yscene.scene, Ycamera.camera)
  }

  componentDidMount() {
    const width = document.getElementById('MB').clientWidth
    const height = document.getElementById('MB').clientHeight
    this.draw(width, height)
  }

  render() {
    return (
      <div id="MB">
        {/* 控件区域 */}
        <div id="mainTop">
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
          <div id="MLbox" className="geometryItem"></div>
          <div id="MLcylinder" className="geometryItem"></div>
          <div id="MLcone" className="geometryItem"></div>
          <div id="MLsphere" className="geometryItem"></div>
          <div id="MLtorus" className="geometryItem"></div>
          <div id="MLicosahedron" className="geometryItem"></div>
          <div id="MLcapsule"className="geometryItem"></div>
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
