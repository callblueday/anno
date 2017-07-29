import React, { Component } from 'react';
import './control-mode.scss';
import Toolbar from '../toolbar/toolbar';
import nipplejs from 'nipplejs';

const settings = {
    multiple: 2,
    markCount: 0
};

var space = 18;
var zoomSize = $(document).width() / 3 - space * 2;

class ControlMode extends Component {
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
    nippleObj.on('start end', function(evt, data) {

    })
    .on('move', function(evt, data) {

    })
    .on('dir:up dir:left dir:down dir:right', function(evt, data) {
        console.log(data);
    })
    .on('pressure', function(evt, data) {

    });
  }

  /* 象限
   *
   *   2 | 1
   *   -----
   *   3 | 4
   */
  calControl (distance, degree, position, direction) {
    var speed = 255 * distance / (zoomSize * 0.5);
    var left = 0,
        right = 0;

    // 1
    if (degree >= 0 & degree < 90) {
        right = speed - (90 - degree) * settings.multiple;
        left = -speed;
    }

    // 2
    if (degree >= 90 & degree < 180) {
        right = speed;
        left = -(speed - (degree - 90) * settings.multiple);
    }

    // 3
    if (degree >= 180 & degree < 270) {
        right = -speed;
        left = (speed - (270 - degree) * settings.multiple);
    }

    // 4
    if (degree >= 270 & degree < 360) {
        right = -(speed - (degree - 270) * settings.multiple);
        left = speed;
    }
  }

  addJoyStickName (joystick, eleId) {
    var nameMaps = {
        "zoneL": "A-B",
        "zoneC": "X-Y",
        "zoneR": "C-D"
    };
    var nameElStr = '<span class="joystick-name">' + nameMaps[eleId] + '</span>'
    joystick.get().ui.front.innerHTML = nameElStr;
  }

  render () {
    return (
      <section className="box control-mode">
        <Toolbar />
        <div className="box-content control-content">
          <div className="tool-bar">
            <button className="cbtn">模式1</button>
            <button className="cbtn">模式2</button>
            <button className="cbtn">模式3</button>
            <button className="cbtn">模式4</button>
            <button className="cbtn">模式5</button>
          </div>

          <div className="zone-wrapper">
            <div className="zone" id="zoneL"></div>
            <div className="zone" id="zoneC"></div>
            <div className="zone" id="zoneR"></div>
          </div>
        </div>
      </section>
    );
  }
}

export default ControlMode;