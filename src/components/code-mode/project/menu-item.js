import React, { Component } from 'react';
import './style.scss';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
        <li key={item.name} onTouchStart={this.loadProject.bind(this, item.id)}><span className="mac_address">{item.name}</span><span className="distance">{item.distance} m</span></li>
    );
  }
}

export default MenuItem;
