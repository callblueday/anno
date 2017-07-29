import React, {Component} from 'react';
import StorySlider from '../story-slider/story-slider';
import { connect } from 'react-redux';
import Toolbar from '../toolbar/toolbar';
import './home-page.scss';

const appList = [
  {
    "text": "手柄模式",
    "name": "controlMode"
  },
  {
    "text": "编程模式",
    "name": "codeMode"
  }
]

class HomePage extends Component {
  render() {
    return (
      <section className="app-body">
        <Toolbar />
        <StorySlider list={appList} />
      </section>
    )
  }

}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(HomePage);