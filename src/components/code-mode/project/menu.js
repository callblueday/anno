import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import MenuItem from './menu-item';
import storage from '../js/storage';
import './style.scss';

const {
    closeMenu
} = require('src/reducers/code');

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectList: []
    };
  }

  componentDidMount () {
    this.updateProjectList();
  }

  componentWillUnmount () {

  }

  updateProjectList () {
    let projectData = storage.fetchData();
    this.setState({
      projectList: projectData
    })
  }

  updateProjectId (id) {
    storage.currentProjectId = id;
  }

  close () {
    this.props.closeMenu();
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
            <span>项目列表</span>
            <div className="headerRight">
                <i className="fa fa-times icon-close" onTouchStart={this.close.bind(this)}></i>
            </div>
        </div>
        <ul className="project-list">
          {
            projectList.map((item, idx) => {
              if(item) {
                return <MenuItem projectData={item} key={item.id}
                closeMenu={this.close.bind(this)}
                updateProjectId={this.updateProjectId.bind(this)}
                updateProjectList={this.updateProjectList.bind(this)}/>
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

