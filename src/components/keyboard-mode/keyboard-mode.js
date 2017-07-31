import React, { Component } from 'react';
import Toolbar from '../toolbar/toolbar';
import LinkDialog from '../link-dialog/link-dialog';
import { comm } from '../../js/comm';
import Grid from './js/grid';

import './keyboard-mode.scss';

class KeyboardMode extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    new Grid().init({
      transition : true
    });
  }

  componentWillUnmount() {

  }

  render () {
    return (
      <section className="box keyboard-mode">
        <Toolbar />
        <div className="box-content keyboard-content">
          <div id="gt-grid-selector" className="gt-grid-control">
            <span className="gt-grid-icon fa fa-table"></span>
            <div className="gt-grid-select">
              <div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
          <div id="gt-grid" className="gt-grid">
            <div></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3><button className="btn btn-primary">click me</button></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
            <div><h3></h3></div>
          </div>
        </div>
        <LinkDialog />
      </section>
    );
  }
}

export default KeyboardMode;