import React, { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import reducers from './reducers/gui';

import HomePage from './components/home-page/home-page';
import CodeMode from './components/code-mode/code-mode';
import ControlMode from './components/control-mode/control-mode';
import CmdMode from './components/cmd-mode/cmd-mode';
import KeyboardMode from './components/keyboard-mode/keyboard-mode';
// import MagicMod from './components/magic-mod/magic-mod';
// import Huasheng from './components/huasheng/huasheng';
import App from './js/app';

const store = createStore(reducers);

render(
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/homePage" exact component={HomePage} />
        <Route path="/cmdMode" exact component={CmdMode} />
        <Route path="/codeMode" exact component={CodeMode} />
        <Route path="/controlMode" exact component={ControlMode} />
        <Route path="/keyboardMode" exact component={KeyboardMode} />
        {/*<Route path="/magicMod" exact component={MagicMod} />
        <Route path="/huasheng" exact component={Huasheng} />*/}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
