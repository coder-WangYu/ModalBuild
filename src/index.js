/**
 * @Editor：WYDX
 * @CreateTime: 2022-04-25 11:07:49
 * @LastEditor: WYDX
 * @LastEditTime: 2022-04-25 11:07:52
 * @Description: 主入口文件
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {
  Scene,
  PerspectiveCamera,
  Vector3,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
  CameraHelper,
  AxesHelper
} from 'three';
import MainTop from "./components/layout/MainTop";
import MainLeft from "./components/layout/MainLeft";
import PubSub from "pubsub-js";

class YuuThree extends Component {
  constructor(props) {
    super(props)
    this.events = {}
    this.container = null // 容器
    this.width = null // 容器宽度
    this.height = null // 容器高度
    this.scene = new Scene() // 场景
    this.camera = null // 相机
    this.renderer = new WebGLRenderer() // 渲染器
    this.axesHelper = new AxesHelper(5) // 坐标系辅助
    this.cameraHelper = null // 相机辅助
  }

  componentDidMount() {
    this.init()
    this.watchPubSubEvent()
  }

  watchPubSubEvent() {
    // 切换显示坐标系辅助
    this.events.switchAxisHelper = PubSub.subscribe("switchAxisHelper", () => {
      const sceneSource = this.scene.toJSON().object.children
      const axisHelper = sceneSource.filter(item => item.type === "AxesHelper")[0]

      !axisHelper
        ? this.scene.add(this.axesHelper)
        : this.scene.remove(this.axesHelper)

      this.renderer.render(this.scene, this.camera)
    })
    this.events.switchCameraHelper = PubSub.subscribe("switchCameraHelper", () => {
      const sceneSource = this.scene.toJSON().object.children
      const axisHelper = sceneSource.filter(item => item.type === "CameraHelper")[0]

      !axisHelper
        ? this.scene.add(this.cameraHelper)
        : this.scene.remove(this.cameraHelper)

      this.renderer.render(this.scene, this.camera)
    })
  }


  init() {
    this.container = document.getElementById("YuuThree")
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.camera = new PerspectiveCamera(45, this.width / this.height, 1, 2000)
    this.cameraHelper = new CameraHelper(this.camera)
    // 相机位置
    this.camera.position.x = 0
    this.camera.position.y = -20
    this.camera.position.z = 10
    this.camera.lookAt(new Vector3(0, 0, 0))
    // 渲染器背景颜色
    this.renderer.setClearColor(0x202225)
    // 设置设备像素比。通常用于HiDPI设备防止模糊输出canvas
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // 渲染在多宽多高的容器内
    this.renderer.setSize(this.width, this.height)
    // 真实的将渲染器dom添加到容器里
    this.container.appendChild(this.renderer.domElement)
    // 添加地面
    const geometry = new PlaneGeometry(20, 20, 20, 20);
    const material = new MeshBasicMaterial({color: 0xcccccc, side: DoubleSide});
    const plane = new Mesh(geometry, material);
    this.scene.add(plane);
    // 渲染
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div className="YuuThree">
        <MainTop />
        <div className="mainContent">
          <MainLeft />
          <div id="YuuThree"></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <YuuThree />,
  document.getElementById('root')
);
