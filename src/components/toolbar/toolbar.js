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

class Toolbar extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
          onBleBtnTap,
          ...props
        } = this.props;
        return (
            <section className="app-toolbar">
              <Link to="/">
                <FontAwesome name='arrow-left' size='2x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
              </Link>

              <button className="btn ble-btn" onTouchStart={onBleBtnTap}>
                <FontAwesome name='bluetooth' size='2x'/>
              </button>

            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
   return state;
};

const mapDispatchToProps = (dispatch) => ({
  onBleBtnTap: (e) => {
    e.preventDefault();
    dispatch(toggleLinkDialog())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);