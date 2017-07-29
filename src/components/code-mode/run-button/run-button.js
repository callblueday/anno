import React, { Component } from 'react';
import './run-button.scss';

class RunButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      btnText: 'Run'
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  clickBtn () {

  }

  render() {
    let btnText = this.state.btnText;

    return (
      <button className="run-btn" onTouchStart={this.clickBtn}>{btnText}</button>
    );
  }
}

export default RunButton;