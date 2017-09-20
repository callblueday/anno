import React, { Component } from 'react';
import Toolbar from '../toolbar/toolbar';
import LinkDialog from '../link-dialog/link-dialog';
import { action } from './js/action';
import noUiSlider from 'nouislider';
import wNumb from './js/wNumb';
import './servo-editor.scss';


const angleRange = [0, 180];

class ServoEditor extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.servoIdList = [12, 14, 3, 13, 11, 15, 4, 1];
    this.initAngles = {
      "12": 160,
      "14": 130,
      "3": 134,
      "13": 132,
      "11": 70,
      "15": 83,
      "4": 173,
      "1": 84
    };
    window.servoAngleMaps = this.servoAngleMaps = {};
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {

  }

  init () {
    // craete sliders
    this.createSliderList(this.servoIdList);
    this.craeteServoAngleMaps();
  }

  craeteServoAngleMaps () {
    for (let item of this.servoIdList) {
      this.servoAngleMaps[item] = {};
      this.servoAngleMaps[item].angle = this.initAngles[item];
    }
  }

  onSliderChange (sliderName, value) {
    let id = parseInt(sliderName.split('-')[1]);
    let angle = parseInt(value[0]);
    this.servoAngleMaps[id].angle = angle;
    action.moveToAngle(id, angle);
  }

  createSliderList (sliderIdList) {
    let range = [0, 180];
    for (let item of sliderIdList) {
      let eleId = 'id-' + item;
      this.createSlider(eleId, range);
    }
  }

  createSlider (eleId, range, orientation) {
    let that = this;
    let id = eleId.split('-')[1];
    let slider = document.getElementById(eleId);
    range = range ? range : angleRange;
    orientation = orientation ? orientation : 'vertical';
    noUiSlider.create(slider, {
      start: that.initAngles[id],
      connect: [true, false],
      direction: 'rtl',
      tooltips: [true],
      orientation: orientation,
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

    let idText = document.createElement("span");
    idText.innerText = eleId.split('-')[1];
    slider.querySelector('.noUi-handle').appendChild(idText);

    slider.noUiSlider.on('slide', this.onSliderChange.bind(this, eleId));

    return slider.noUiSlider;
  }

  initServos () {
    action.initServos();
    // 改变页面 UI 滑块也回到初始位置
  }

  setToZero () {
    let that = this;
    let isSure = confirm("确认存储所有当前位置为初始位置？")
    if (isSure) {
      for (let i = 0; i < this.servoIdList.length; i++) {
        let id = parseInt(that.servoIdList[i]);
        let value = parseInt(that.servoAngleMaps[id].angle) - that.initAngles[id.toString()];
        action.saveAngleToFlash(id, value);
      }
    }
  }

  render () {
    let servos = this.servoIdList.concat();
    let servoGroup1 = servos.splice(0,4);
    let servoGroup2 = servos;
    return (
      <section className="box control-mode servo-editor">
        <Toolbar />
        <div className="topbar">
          <h3>舵机调试</h3>
        </div>
        <div className="box-content control-content">
          <div className="wrapper opts-wrapper">
            <div className="item">
              <button type="button" className="btn btn-primary" onTouchStart={this.initServos.bind(this)}>回到初始位置</button>
              <button type="button" className="btn btn-primary" onTouchStart={this.setToZero.bind(this)}>存储当前位置为初始值</button>
            </div>
          </div>

          <div className="wrapper slider-wrapper">
            <div className="slider-box angle">
              {
                servoGroup1.map((item, idx) => {
                  let id = 'id-' + item;
                  if(item) {
                    return <div key={id} className="slider" id={id}></div>
                  }
                })
              }
            </div>
            <div className="slider-box angle">
              {
                servoGroup2.map((item, idx) => {
                  let id2 = 'id-' + item;
                  if(item) {
                    return <div key={id2} className="slider" id={id2}></div>
                  }
                })
              }
            </div>
          </div>

        </div>
        <LinkDialog />
      </section>
    );
  }
}

export default ServoEditor;
