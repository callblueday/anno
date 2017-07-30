import React, { Component } from 'react';
import { connect } from 'react-redux';
import './link-dialog.scss';
import ReactModal from 'react-modal';

const {
    openLinkDialog,
    closeLinkDialog,
    toggleLinkDialog
} = require('../../reducers/interface');

class LinkDialog extends Component {

  constructor(props) {
    super(props);

    var temp = [
      {
        "name": "4588D39F3FF3FSFEG1",
        "distance": 0.1
      },
      {
        "name": "4588D39F3FF3FSFEG2",
        "distance": 0.2
      },
      {
        "name": "4588D39F3FF3FSFEG3",
        "distance": 0.3
      }
    ];
    this.dataList = temp.sort(function (a, b) {
      return  a.distance - b.distance;
    });
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  open () {
    this.setState({ showModal: true });
  }

  render () {
    let that = this;
    console.log(this.props.dialogVisible);
    const {
      close,
      ...props
    } = this.props;

    return (
      <ReactModal
         isOpen={this.props.dialogVisible}
         contentLabel="onRequestClose Example"
         className="Modal"
         overlayClassName="Overlay"
      >
        <div className="dialogHeader">
            <i className="fa fa-bluetooth"></i>
            <div className="headerRight">
                <i className="fa fa-refresh connect-dialog-refresh"></i>
                <i className="fa fa-times connect-dialog-close" onTouchStart={close}></i>
            </div>
        </div>
        <ul className="connectList">
          {
            this.dataList.map((item, idx) => {
              if(item) {
                return <li key={item.name}><span className="mac_address">{item.name}</span><span className="distance">{item.distance} m</span></li>
              }
            })
          }
        </ul>
      </ReactModal>
    );
  }
}

const mapStateToProps = state => ({
    dialogVisible: state.interface.dialogVisible
});

const mapDispatchToProps = (dispatch) => ({
  close: (e) => {
    e.preventDefault();
    dispatch(closeLinkDialog())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkDialog);
