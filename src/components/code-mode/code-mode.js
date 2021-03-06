import React, { Component } from 'react';
import { connect } from 'react-redux';

import BlockMove from './js/blocks/block-move';
import StartBlocks from './js/blocks/block-start';
import ControlBlocks from './js/blocks/block-control';

import Toolbar from '../toolbar/toolbar';
import RunButton from './run-button/run-button';
import LinkDialog from '../link-dialog/link-dialog';
import Menu from './project/menu';
import toast from 'src/components/message-box/message-box';
import storage from './js/storage';
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
    this.injectBlockly();
    this.addBlocks();
    this.addStartBlockToStage();
  }

  componentWillUnmount() {

  }

  addStartBlockToStage () {
    var xmlData = `
      <xml><block type="when_start" id="@fiknb:[[;iHSVP%1rqe" x="65" y="23"></block></xml>
    `;
    this.renderXml(xmlData);
  }

  addBlocks () {
    new BlockMove();
    new StartBlocks();
    new ControlBlocks();
  }

  openProjectMenu () {
    this.props.openMenu();
  }

  newProject () {
    this.addStartBlockToStage();
    storage.currentProjectId = null;
  }

  saveProject () {
    if (storage.currentProjectId) {
      storage.update(storage.currentProjectId, ()=> {
        toast("更新成功！");
      });
    } else {
      var name = prompt("请输入项目名称","");
      if (name.length == 0) {
        toast("您输入的项目名称不能为空");
      } else if (name) {
        let id = storage.add(name);
        storage.currentProjectId = id;
        toast("保存成功！");
      }
    }
  }

  renderXml (xmlData) {
    Blockly.mainWorkspace.clear();
    let xml = Blockly.Xml.textToDom(xmlData);
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
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
          <button className="btn-project btn fa fa-folder-o" onTouchStart={this.openProjectMenu.bind(this)}></button>
          <button className="btn-save btn fa fa-save" onTouchStart={this.saveProject.bind(this)}></button>
          <button className="btn-new btn fa fa-file-o" onTouchStart={this.newProject.bind(this)}></button>
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
