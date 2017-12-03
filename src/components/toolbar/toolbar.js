import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import './toolbar.scss';

const {
  openLinkDialog,
  closeLinkDialog,
  toggleLinkDialog
} = require('../../reducers/interface');

const appList = [
  {
    "text": "调试",
    "name": "cmdMode"
  },
  {
    "text": "操控",
    "name": "controlMode"
  },
  {
    "text": "编程",
    "name": "codeMode"
  }
];

class Toolbar extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        "title": "主界面"
      };
    }

    componentDidMount() {
      this.updateTitle();
    }

    updateTitle () {
      let hash = location.href.split('/#/')[1];
      let title = '主界面';
      for (let item of appList) {
        if (item.name === hash) {
          title = item.text;
          this.setState({
            "title": title
          });
          break;
        }
      }
    }

    render () {
      const {
        onBleBtnTap,
        ...props
      } = this.props;
      return (
          <section className="app-toolbar">
            <Link to="/" className="return-back"></Link>

            <span className="title">{this.state.title}</span>

            <button className="ble-btn" onTouchStart={onBleBtnTap}></button>

          </section>
      );
    }
}

const mapStateToProps = state => ({
  bleConnected: state.ble.bleConnected,
});

const mapDispatchToProps = (dispatch) => ({
  onBleBtnTap: (e) => {
    e.preventDefault();
    dispatch(toggleLinkDialog())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
