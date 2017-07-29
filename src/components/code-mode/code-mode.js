import React, { Component } from 'react';
import './code-mode.scss';
import Toolbar from '../toolbar/toolbar';

class CodeMode extends Component {
  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <section className="box code-mode">
        <Toolbar />
        <div className="box-content code-content">

        </div>
      </section>
    );
  }
}

export default CodeMode;