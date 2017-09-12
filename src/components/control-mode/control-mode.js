import React, { Component } from 'react';
import './control-mode.scss';
import Toolbar from '../toolbar/toolbar';
import nipplejs from 'nipplejs';
import LinkDialog from '../link-dialog/link-dialog';
import { action } from '../../js/action';

const settings = {
    multiple: 2,
    markCount: 0
};

// 速度范围
const SPEED_RANGE = [800, 2000];
// 角度范围
// const ANGLE_RANGE = [0, 80];
const ANGLE_RANGE = {
  "A": [0, 80],
  "B": [0, 80],
  "C": [0, 80],
  "D": [0, 80],
  "X": [0, 80],
  "Y": [0, 80]
}

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
    }
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    // this.joystickL && this.joystickL.destroy();
    // this.joystickC && this.joystickC.destroy();
    // this.joystickR && this.joystickR.destroy();
  }

  init () {
    this.joystickL = this.createZone("zoneL");
    this.joystickC = this.createZone("zoneC");
    this.joystickR = this.createZone("zoneR");

    this.joystickL.axisMap = {
      "up": "A",
      "down": "A",
      "left": "B",
      "right": "B"
    };
    this.joystickC.axisMap = {
      "up": "C",
      "down": "C",
      "left": "D",
      "right": "D"
    };
    this.joystickR.axisMap = {
      "up": "X",
      "down": "X",
      "left": "Y",
      "right": "Y"
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
    nippleObj.on('start end', function(evt, data) {

    })
    .on('move', function(evt, data) {
      count++;
      if(count >= 10) {
        count = 0;
        let r = zoomSize / 2;

        let xAxis = nippleObj.axisMap[data.direction.x];
        let yAxis = nippleObj.axisMap[data.direction.y];

        let yAngle = Math.abs(Math.sin(data.angle.degree)) * (data.distance / r * ANGLE_RANGE[yAxis][1]);
        let xAngle = Math.abs(Math.cos(data.angle.degree)) * (data.distance / r * ANGLE_RANGE[xAxis][1]);

        let force = Math.min(data.force, 1);
        let speed = SPEED_RANGE[1] * force;

        action.moveTwoAxis(xAxis, xAngle, yAxis, yAngle, speed)

        // let axis = nippleObj.axisMap[data.direction.angle];
        // that.sendData(data, axis);
      }

    })
    .on('dir:up dir:left dir:down dir:right', function(evt, data) {

    })
    .on('pressure', function(evt, data) {

    });
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
