import React, { Component } from 'react';
import Toolbar from '../toolbar/toolbar';
import { action } from '../servo-editor/js/action';
import './style.scss';

class ServoControl extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {

  }

  init () {

  }

  move (type) {
    console.log(type);
  }

  render () {
    return (
      <section className="box control-mode servo-control">
        <Toolbar />
        <div className="topbar">
          <h3>舵机控制</h3>
        </div>
        <div className="box-content control-content servo-control">
            <div className="joystick">
              <table>
                <tr>
                  <td></td>
                  <td><button type="button" className="btn btn-success" onClick={this.move.bind(this, 'forward')}>向前</button></td>
                  <td></td>
                </tr>
                <tr>
                  <td><button type="button" className="btn btn-success" onClick={this.move.bind(this, 'left')}>向左</button></td>
                  <td><button type="button" className="btn btn-danger" onClick={this.move.bind(this, 'begin')}>初始位置</button></td>
                  <td><button type="button" className="btn btn-success" onClick={this.move.bind(this, 'right')}>向右</button></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button type="button" className="btn btn-success" onClick={this.move.bind(this, 'backward')}>向后</button></td>
                  <td></td>
                </tr>
              </table>
            </div>

            <div className="other-opts">
              <button type="button" className="btn btn-primary" onClick={this.move.bind(this, 'shrink')}>启动状态</button>
              <button type="button" className="btn btn-primary" onClick={this.move.bind(this, 'say-hello')}>打招呼</button>
              <button type="button" className="btn btn-primary" onClick={this.move.bind(this, 'push-up')}>俯卧撑</button>
              <button type="button" className="btn btn-primary" onClick={this.move.bind(this, 'look-around')}>左右张望</button> <br />
              <button type="button" className="btn btn-primary" onClick={this.move.bind(this, 'fall')}>趴下</button>
              <button type="button" className="btn btn-primary" onClick={this.move.bind(this, 'stand')}>站立</button>
            </div>

        </div>
      </section>
    );
  }
}

export default ServoControl;
