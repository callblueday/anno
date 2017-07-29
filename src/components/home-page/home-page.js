import React, {Component} from 'react';
import './home-page.scss';
import StorySlider from '../story-slider/story-slider';
import { connect } from 'react-redux';

const appList = [
  {
    "text": "Control Mode",
    "name": "controlMode"
  },
  {
    "text": "Code Mode",
    "name": "codeMode"
  }
]

class HomePage extends Component {
  render() {
    return (
      <section className="app-body">
        <StorySlider list={appList} />
      </section>
    )
  }

}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(HomePage);