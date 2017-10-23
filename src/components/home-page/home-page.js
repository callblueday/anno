import React, {Component} from 'react';
import StorySlider from '../story-slider/story-slider';
import { connect } from 'react-redux';
import Toolbar from '../toolbar/toolbar';
import LinkDialog from '../link-dialog/link-dialog';
import './home-page.scss';

const appList = [
  // {
  //   "text": "调试模式",
  //   "name": "cmdMode"
  // },
  // {
  //   "text": "超能魔块",
  //   "name": "magicMod"
  // },
  // {
  //   "text": "飞机",
  //   "name": "huasheng"
  // },
  // {
  //   "text": "手柄模式",
  //   "name": "controlMode"
  // },
  {
    "text": "舵机编辑器",
    "name": "servoEditor"
  },
  {
    "text": "编程模式",
    "name": "codeMode"
  },
  // {
  //   "text": "键盘模式",
  //   "name": "keyboardMode"
  // },
]

class HomePage extends Component {
  render() {
    return (
      <section className="app-body">
        <Toolbar />
        <StorySlider list={appList} />
        <LinkDialog />
      </section>
    )
  }

}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(HomePage);
