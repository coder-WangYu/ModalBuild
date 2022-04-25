/**
 * @Editor：WYDX
 * @CreateTime: 2022-04-25 15:08:54
 * @LastEditor: WYDX
 * @LastEditTime: 2022-04-25 15:08:54
 * @Description: 头部工具栏
 */
import React, {Component} from 'react';
import './index.scss';
import { Tooltip } from "antd";
import axisImg from "../../../assets/img/controllers/axis.svg";
import cameraImg from "../../../assets/img/controllers/camera.svg";
import PubSub from "pubsub-js";

class MainTop extends Component {
  switchCameraHelper() {
    PubSub.publish("switchCameraHelper")
  }

  switchAxisHelper() {
    PubSub.publish("switchAxisHelper")
  }

  render() {
    return (
      <div className="mainTop clearfix">
        <div className="left"></div>
        <div className="right">
          <Tooltip placement="bottom" title="开启相机辅助">
            <div className="controlItem" onClick={this.switchCameraHelper}>
              <img src={cameraImg} alt=""/>
            </div>
          </Tooltip>
          <Tooltip placement="bottom" title="开启坐标轴辅助">
            <div className="controlItem" onClick={this.switchAxisHelper}>
              <img src={axisImg} alt=""/>
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default MainTop;
