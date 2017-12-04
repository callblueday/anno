import React, {Component} from 'react';
import StorySlider from '../story-slider/story-slider';
import { connect } from 'react-redux';
import Toolbar from '../toolbar/toolbar';
import LinkDialog from '../link-dialog/link-dialog';
import './home-page.scss';

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

class HomePage extends Component {
  render() {
    return (
      <section className="box app-body">
        <Toolbar nameMap={appList}/>
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
