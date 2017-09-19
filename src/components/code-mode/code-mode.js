import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockMove from './js/block-move';
import StartBlocks from './js/block-start';
import ControlBlocks from './js/block-control';

import Toolbar from '../toolbar/toolbar';
import RunButton from './run-button/run-button';
import LinkDialog from '../link-dialog/link-dialog';
import Menu from './project/menu';
import './code-mode.scss';

const {
    openMenu,
    closeMenu
} = require('../../reducers/code');

class CodeMode extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let that = this;
    setTimeout(function () {
      that.injectBlockly();
      that.addBlocks();
      that.addStartBlockToStage();
    }, 1000);
  }

  componentWillUnmount() {

  }

  addStartBlockToStage () {
    var xmlData = `
      <xml><block type="when_start" id="@fiknb:[[;iHSVP%1rqe" x="65" y="23"></block></xml>
    `;
    var xml = Blockly.Xml.textToDom(xmlData);
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
  }

  addBlocks () {
    new BlockMove();
    new StartBlocks();
    new ControlBlocks();
  }

  openProjectMenu () {

  }

  saveProject (id) {

  }

  renderXml () {
    let xml = ``;
  }

  injectBlockly () {
    this.workspace = Blockly.inject('blocklyDiv',
      {
        media: './lib/media/',
       toolbox: document.getElementById('toolbox'),
       zoom: {
         "controls": false,
         "wheel": true,
         "startScale": 0.9,
         "minScale": 0.5,
         "maxScale": 1,
         "scaleSpeed": 1.2
       },
      trashcan: false
     });
  }

  render() {
    return (
      <section className="box code-mode">
        <Toolbar />
        <div className="topbar code-topbar">
          <button className="btn-project btn fa fa-folder-o" onTouchStart={openMenu}></button>
          <button className="btn-save btn fa fa-save" onTouchStart={this.saveProject.bind(this)}></button>
        </div>
        <div className="box-content code-content" id="blocklyDiv">

        </div>
        <RunButton />
        <LinkDialog />
        <Menu />
      </section>
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
  },

  openMenu: (e) => {
    dispatch(openMenu())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeMode);
