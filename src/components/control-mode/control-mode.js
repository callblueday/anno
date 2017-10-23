import React, { Component } from 'react';
import './control-mode.scss';
import Toolbar from '../toolbar/toolbar';
import nipplejs from 'nipplejs';
import LinkDialog from '../link-dialog/link-dialog';
import { action } from '../../js/action';
import { Emitter } from '../../js/emitter';

const settings = {
    multiple: 2,
    markCount: 0
};

// 速度范围
const SPEED_RANGE = [800, 2000];
const ANGLE_RANGE = {
  "A": [0, 80],
  "B": [0, 80],
  "C": [0, 80],
  "D": [0, 80],
  "X": [0, 80],
  "Y": [0, 80]
};

// 每次运动的固定位移
const SHIFT_DISTANCE = 5;
// 允许的最小运动范围半径
const MIN_MOVE_RADIUS = 30;

// 两次指令间发送的时间间隔，单位毫秒
const CMD_INTERVAL = 100;

var space = 18;
var zoomSize = window.innerWidth / 3 - space * 2;

class ControlMode extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "paishe": false,
      "penqi": false,
      "jiaqu": false,
      "xiqu": false,
      "hanjie": false
    };

    this.activeAxis = [];
  }

  componentDidMount() {
    this.init();

    Emitter.on('connectSuccess', function() {
      action.enterJoystickMode();
      action.setRelativeMove();
    });

    action.enterJoystickMode();
    action.setRelativeMove();
  }

  componentWillUnmount() {
    action.exitJoystickMode();
    action.setAbsoluteMove();
    // this.joystickL && this.joystickL.destroy();
    // this.joystickC && this.joystickC.destroy();
    // this.joystickR && this.joystickR.destroy();
  }

  init () {
    this.joystickL = this.createZone("zoneL");
    this.joystickC = this.createZone("zoneC");
    this.joystickR = this.createZone("zoneR");

    this.joystickL.axisMap = {
      "left": "A-",
      "right": "A",
      "up": "B",
      "down": "B-",
    };
    this.joystickC.axisMap = {
      "left": "C-",
      "right": "C",
      "up": "D",
      "down": "D-",
    };
    this.joystickR.axisMap = {
      "left": "X-",
      "right": "X",
      "up": "Y",
      "down": "Y-",
    };

    this.bindNipple(this.joystickL);
    this.bindNipple(this.joystickC);
    this.bindNipple(this.joystickR);
  }

  createZone (eleId) {
    var options = {
      zone: document.getElementById(eleId),
      mode: 'static',
      position: {
          left: "50%",
          top: "50%"
      },
      color: '#333',
      threshold: 0.01,
      multitouch: false,
      size: zoomSize,
      restOpacity: 0.8
    };
    var joystick = nipplejs.create(options);
    this.addJoyStickName(joystick, eleId);
    return joystick;
  }

  bindNipple (nippleObj) {
    let count = 0;
    let that = this;
    nippleObj.on('start', function(evt, data) {

    })
    .on('move', function(evt, data) {
      let distance = data.distance;
      if (distance < zoomSize * 0.3) {
        return;
      }

      let force = Math.min(data.force, 1);
      let speed = parseInt(SPEED_RANGE[1] * force);

      let xAxis = nippleObj.axisMap[data.direction.x];
      let yAxis = nippleObj.axisMap[data.direction.y];

      nippleObj.xAxis = xAxis;
      nippleObj.yAxis = yAxis;

      let axis = nippleObj.axisMap[data.direction.angle];
      nippleObj.axis = axis;

      that.refreshActiveAxis(nippleObj.xAxis, false);
      that.refreshActiveAxis(nippleObj.yAxis, false);
      that.refreshActiveAxis(axis, true);
      that.doMove(speed);

    })
    .on('dir:up dir:left dir:down dir:right', function(evt, data) {
    })
    .on('pressure', function(evt, data) {

    })
    .on('end', function (evt, data) {
      console.log('end');
      that.refreshActiveAxis(nippleObj.xAxis, false);
      that.refreshActiveAxis(nippleObj.yAxis, false);

      that.refreshActiveAxis(nippleObj.axis, false);
    });
  }

  refreshActiveAxis (axisName, isActive) {
    let newAxis = [];
    // remove exist
    for (let axis of this.activeAxis) {
      if (axis.split('-')[0] !== axisName.split('-')[0]) {
        newAxis.push(axis)
      }
    }
    if (isActive) {
      // add new
      newAxis.push(axisName);
    }
    this.activeAxis = newAxis;
  }

  doMove (speed) {
    let curTime = new Date().getTime();
    if(!this.preTime) {
      this.preTime = curTime;
    }

    // 小于预设的时间间隔，丢掉数据
    if (curTime - this.preTime < CMD_INTERVAL) {
      return;
    }

    this.preTime = curTime;

    let cmd = 'G01 ';
    for (let axis of this.activeAxis) {
      cmd += (axis + SHIFT_DISTANCE + ' ');
    }
    cmd += ('F2000');
    action.moveFree(cmd);
  }

  sendData (data, axis) {
    let r = zoomSize / 2;
    let angle = data.distance / r * ANGLE_RANGE[axis][1] + 5;
    let force = Math.min(data.force, 1); // let force <= 4
    let speed = SPEED_RANGE[1] * force;
    action.move(axis, angle, speed);
  }

  addJoyStickName (joystick, eleId) {
    var nameMaps = {
        "zoneL": "J1-J2",
        "zoneC": "J3-J4",
        "zoneR": "J5-J6"
    };
    var nameElStr = '<span class="joystick-name">' + nameMaps[eleId] + '</span>'
    joystick.get().ui.front.innerHTML = nameElStr;
  }

  toggle (e) {
    let type = e.target.getAttribute("data-mode");
    let newState = {};
    newState[type] = !this.state[type];

    // close other mode.
    if(newState[type]) {
      for(var i in this.state) {
        if(i !== type && this.state[i]) {
          newState[i] = false;
        }
      }
    }

    this.setState(newState);
    let mode = type + '-' + (newState[type] ? 'open' : 'close');
    action.setMode(mode);
  }

  render () {
    return (
      <section className="box control-mode">
        <Toolbar />
        <div className="box-content control-content">
          <div className="tool-bar">
            <button data-mode="paishe" className={
              this.state["paishe"] ? "cbtn btn-selected" : "cbtn"
            } onTouchStart={this.toggle.bind(this)}>拍摄</button>
            <button data-mode="penqi" className={
              this.state["penqi"] ? "cbtn btn-selected" : "cbtn"
            } onTouchStart={this.toggle.bind(this)}>喷漆</button>
            <button data-mode="jiaqu" className={
              this.state["jiaqu"] ? "cbtn btn-selected" : "cbtn"
            } onTouchStart={this.toggle.bind(this)}>夹取</button>
            <button data-mode="xiqu" className={
              this.state["xiqu"] ? "cbtn btn-selected" : "cbtn"
            } onTouchStart={this.toggle.bind(this)}>吸取</button>
            <button data-mode="hanjie" className={
              this.state["hanjie"] ? "cbtn btn-selected" : "cbtn"
            } onTouchStart={this.toggle.bind(this)}>焊接</button>
          </div>

          <div className="zone-wrapper">
            <div className="zone" id="zoneL"></div>
            <div className="zone" id="zoneC"></div>
            <div className="zone" id="zoneR"></div>
          </div>
        </div>
        <LinkDialog />
      </section>
    );
  }
}

export default ControlMode;
