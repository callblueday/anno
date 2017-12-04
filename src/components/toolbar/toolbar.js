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

const titleMap = {
  "app-body": "主界面",
  "cmd-mode": "调试",
  "control-mode": "操控",
  "code-mode": "编程"
};

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
      let hash = document.querySelector('.box').getAttribute("class").split(" ")[1];
      this.setState({
        "title": titleMap[hash]
      });
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
