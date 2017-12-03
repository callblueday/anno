import React, { Component } from 'react';
import storage from '../js/storage';
import toast from 'src/components/message-box/message-box';
import './style.scss';

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  loadProject (data) {
    this.props.updateProjectId(data.id);
    this.renderXml(data.xmlData);
    arguments[1].preventDefault();
    arguments[1].stopPropagation();
  }

  edit () {
    console.log('edit');
    arguments[1].stopPropagation();
  }

  delete (item) {
    let that = this;
    let name = item.name;
    let r = confirm(`确认删除项目 ${name} ?`);
    if (r == true) {
      storage.delete(item.id, () => {
        that.props.updateProjectList();
        toast("删除成功！");
      });
    } else {

    }
    arguments[1].stopPropagation();
  }

  clear () {
    Blockly.mainWorkspace.clear();
  }

  renderXml (xmlStr) {
    this.clear();
    let xml = Blockly.Xml.textToDom(xmlStr);
    Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
    this.props.closeMenu();
  }

  render() {
    let item = this.props.projectData;
    return (
        <li key={item.id} onTouchStart={this.loadProject.bind(this, item)} className="menu-item">
          <div className="name">
            {this.props.projectData.name}
          </div>
          <div className="opt">
            {/*<i className="fa fa-edit icon-edit" onTouchStart={this.edit.bind(this, item.id)}></i>*/}
            <i className="fa fa-trash-o icon-delete" onTouchStart={this.delete.bind(this, item)}></i>
          </div>
        </li>
    );
  }
}

export default MenuItem;
