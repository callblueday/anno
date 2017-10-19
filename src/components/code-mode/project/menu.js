import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import MenuItem from './menu';
import './style.scss';

const {
    closeMenu
} = require('../../../reducers/code');

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

  close () {
    this.props.closeMenu();
  }

  loadProject () {

  }

  render() {
    let projectList = this.state.projectList;
    return (
      <ReactModal
         isOpen={this.props.menuVisible}
         contentLabel="onRequestClose Example"
         className="Modal"
         overlayClassName="Overlay"
      >
        <div className="dialogHeader">
            <span>project list</span>
            <div className="headerRight">
                <i className="fa fa-times icon-close" onTouchStart={this.close.bind(this)}></i>
            </div>
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

const mapStateToProps = state => ({
  menuVisible: state.code.menuVisible
});


const mapDispatchToProps = (dispatch) => ({
  closeMenu: (e) => {
    e && e.preventDefault();
    dispatch(closeMenu())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

