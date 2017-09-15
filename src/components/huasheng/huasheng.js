import React, { Component } from 'react';
import Toolbar from '../toolbar/toolbar';
import LinkDialog from '../link-dialog/link-dialog';
import { comm } from '../../js/comm';
import { Emitter } from '../../js/emitter';

class Huasheng extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  send (char) {
    comm.send(char);
  }

  render () {
    return (
      <section className="box cmd-mode">
        <Toolbar />
        <div className="box-content cmd-content">
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'A')}>A</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'B')}>B</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'C')}>C</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'D')}>D</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'E')}>E</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'F')}>F</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'G')}>G</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'H')}>H</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'I')}>I</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'J')}>J</button>
          <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this, 'K')}>K</button>
        </div>
        <LinkDialog />
      </section>
    );
  }
}

export default Huasheng;
