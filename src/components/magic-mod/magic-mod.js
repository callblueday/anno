import React, { Component } from 'react';
import './magic-mod.scss';
import Toolbar from '../toolbar/toolbar';
import nipplejs from 'nipplejs';
import LinkDialog from '../link-dialog/link-dialog';
import { action } from './js/action';
import noUiSlider from 'nouislider';
import wNumb from './js/wNumb';


// 速度范围
const LIMIT_SPEED = 255;
const SPEED_RANGE = {
  "1": [0, 255],
  "2": [0, 255]
}

var space = 18;
var zoomSize = window.innerWidth / 3 - space * 2;

class MagicMod extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    // this.joystick && this.joystick.destroy();
    // this.joystickC && this.joystickC.destroy();
    // this.joystickR && this.joystickR.destroy();
  }

  init () {
    this.joystick = this.createZone("zoneL");
    this.joystick.axisMap = {
      "up": "1",
      "down": "1",
      "left": "2",
      "right": "2"
    };
    this.bindNipple(this.joystick);

    // craete sliders
    this.createSlider("id-1-motor");
    this.createSlider("id-1-angle", [0, 360]);
    this.createSlider("id-2-motor");
    this.createSlider("id-2-angle", [0, 360]);
  }

  onSliderChange (sliderName, value) {
    let id = parseInt(sliderName.split('-')[1]);
    let angleSliders = ['id-1-angle', 'id-2-angle'];
    let motorSliders = ['id-1-motor', 'id-2-motor'];

    if (angleSliders.includes(sliderName)) {
      action.moveAngle(id, value)
    }

    if (motorSliders.includes(sliderName)) {
      action.moveMotor(id, value)
    }
  }

  createSlider (eleId, range) {
    let slider = document.getElementById(eleId);
    range = range ? range : [0, 255];
    noUiSlider.create(slider, {
      start: 0,
      connect: [true, false],
      direction: 'rtl',
      tooltips: [true],
      orientation: "vertical",
      range: {
        'min': range[0],
        'max': range[1]
      },
      format: wNumb({
        decimals: 0 // 小数点的位数
      }),
      // pips: {
      //   mode: 'values',
      //   values: range,
      //   density: 7
      // }
    });
    slider.noUiSlider.on('slide', this.onSliderChange.bind(this, eleId));
    return slider.noUiSlider;
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

        let force = Math.min(data.force, 1);
        let speed = LIMIT_SPEED * force;

        let yValue = data.distance / r * speed;
        let xValue = data.distance / r * speed;

        action.moveMotor(xAxis, parseInt(xValue));
        action.moveMotor(yAxis, parseInt(yValue));
      }

    })
    .on('dir:up dir:left dir:down dir:right', function(evt, data) {

    })
    .on('pressure', function(evt, data) {

    });
  }

  addJoyStickName (joystick, eleId) {
    var nameMaps = {
        "zoneL": "x:d1\ny:d2",
        "zoneC": "J3-J4",
        "zoneR": "J5-J6"
    };
    var nameElStr = '<span class="joystick-name">' + nameMaps[eleId] + '</span>'
    joystick.get().ui.front.innerHTML = nameElStr;
  }

  render () {
    return (
      <section className="box control-mode">
        <Toolbar />
        <div className="topbar">
          <h3>超能魔块</h3>
        </div>
        <div className="box-content control-content">
          <div className="zone-wrapper">
            <div className="zone" id="zoneL"></div>
          </div>
          <div className="slider-wrapper">
            <div className="slider-box angle">
              <div className="slider" id="id-1-motor"></div>
              <div className="slider" id="id-1-angle"></div>
              <span className="tip">魔块1</span>
            </div>
            <div className="slider-box speed">
              <div className="slider" id="id-2-motor"></div>
              <div className="slider" id="id-2-angle"></div>
              <span className="tip">魔块2</span>
            </div>
          </div>
        </div>
        <LinkDialog />
      </section>
    );
  }
}

export default MagicMod;
