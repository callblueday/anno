import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './style.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [
        {
          "name": "4588D39F3FF3FSFEG1",
          "distance": 0.1,
          "id": 1
        },
        {
          "name": "4588D39F3FF3FSFEG2",
          "distance": 0.2,
          "id": 2
        },
        {
          "name": "4588D39F3FF3FSFEG3",
          "distance": 0.3,
          "id": 3
        }
      ]
    };
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  loadProject () {

  }

  render() {
    let projectList = this.state.projectList;
    return (
      <ReactModal
         isOpen={this.props.dialogVisible}
         contentLabel="onRequestClose Example"
         className="Modal"
         overlayClassName="Overlay"
      >
        <div className="dialogHeader">
            project list
        </div>
        <ul className="connectList">
          {
            projectList.map((item, idx) => {
              if(item) {
                return <li key={item.name} onTouchStart={this.loadProject.bind(this, item.id)}><span className="mac_address">{item.name}</span><span className="distance">{item.distance} m</span></li>
              }
            })
          }
        </ul>
      </ReactModal>
    );
  }
}

export default Menu;
