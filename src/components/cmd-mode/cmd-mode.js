import React, { Component } from 'react';
import Toolbar from '../toolbar/toolbar';
import LinkDialog from '../link-dialog/link-dialog';
import { comm } from '../../js/comm';
import './cmd-mode.scss';

class CmdMode extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  send (e) {
    let cmdType = document.querySelector('[name=cmdMode]:checked').value;
    let value = e.target.parentNode.querySelector('input').value;
    let cmd = null;

    var valueArray = value.split(" "), hexArray = [], decimalArray = [];
    if(cmdType == 'hex') {
      for(var i in valueArray) {
          if(valueArray[i]) {
              hexArray.push(parseInt(valueArray[i], 16).toString(16));
              decimalArray.push(parseInt(valueArray[i], 16));
          }
      }
      cmd = decimalArray;
    } else {
      cmd = value + '\n';
    }

    this.addMsg(cmd.toString());
    comm.send(cmd, cmdType);
  }

  addMsg (msgStr) {
    var p = msgStr + "<br/>";
    $('.msg').append(p);
    this.toBottom();
  }

  // 将滚动条始终置于页面底部
  toBottom () {
    var scrollOffset = $('.msg')[0].scrollHeight - $('.msg').height();
    $('.msg').animate({scrollTop: scrollOffset}, 0);
  }

  change (e) {

  }

  render () {
    return (
      <section className="box cmd-mode">
        <Toolbar />
        <div className="box-content cmd-content">
          <div className="msg">
          </div>

          <div className="opts">
            <form className="cmd-type">
              <label className="radio-inline">
                <input type="radio" name="cmdMode" id="" value="hex" /> HEX
              </label>
              <label className="radio-inline">
                <input type="radio" name="cmdMode" id="" value="acsii" checked onChange={this.change}/> ASCII
              </label>
            </form>

            <form className="form-inline ops">
              <div className="cmd-item">
                <div className="form-group col-xs-9 cmd">
                  <input type="text" className="form-control cmd-input" placeholder="ff 55 03 00 01 00" defaultValue="ff 55 06 00 02 0a 09 ff 00" />
                </div>
                <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this)}>Send</button>
              </div>
              <div className="cmd-item">
                <div className="form-group col-xs-9 cmd">
                  <input type="text" className="form-control cmd-input" placeholder="ff 55 03 00 01 00" defaultValue="ff 55 06 00 02 0a 09 00 00" />
                </div>
                <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this)}>Send</button>
              </div>

              <div className="cmd-item">
                <div className="form-group col-xs-9 cmd">
                  <input type="text" className="form-control cmd-input" placeholder="G91" defaultValue="G91" />
                </div>
                <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this)}>Send</button>
              </div>

              <div className="cmd-item">
                <div className="form-group col-xs-9 cmd">
                  <input type="text" className="form-control cmd-input" placeholder="G01 A10 F2000" defaultValue="G01 A10 F2000" />
                </div>
                <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this)}>Send</button>
              </div>

              <div className="cmd-item">
                <div className="form-group col-xs-9 cmd">
                  <input type="text" className="form-control cmd-input" placeholder="G90" defaultValue="G90" />
                </div>
                <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this)}>Send</button>
              </div>

              <div className="cmd-item">
                <div className="form-group col-xs-9 cmd">
                  <input type="text" className="form-control cmd-input" placeholder="G01 A10 F2000" defaultValue="G01 A10 F2000" />
                </div>
                <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this)}>Send</button>
              </div>

              <div className="cmd-item">
                <div className="form-group col-xs-9 cmd">
                  <input type="text" className="form-control cmd-input" placeholder="G01 A10 B10 C10 D10 X10 F2000" defaultValue="G01 A10 B10 C10 D10 X10 F2000" />
                </div>
                <button type="button" className="btn btn-default col-xs-3 btn-send" onTouchStart={this.send.bind(this)}>Send</button>
              </div>
            </form>

            <div className="col-xs-12 menus">
              <button id="btn-cmd-add" className="btn fa fa-plus"></button>
            </div>
          </div>
        </div>
        <LinkDialog />
      </section>
    );
  }
}

export default CmdMode;