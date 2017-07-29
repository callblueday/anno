import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import './toolbar.scss';

const {
    btConnect,
    btDisconnect,
    btReceive
} = require('../../reducers/ble');

class Toolbar extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            ...props
        } = this.props;
        return (
            <section className="app-toolbar">
              <div className="app-back">
                <Link to="/">
                  <FontAwesome name='arrow-left' size='2x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
                </Link>
              </div>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
   return state;
};

const mapDispatchToProps = (dispatch) => ({
  // onDeviceChange: (e) => {
  //   dispatch(deviceChanged(deviceInfos[e.target.value]))
  // }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);