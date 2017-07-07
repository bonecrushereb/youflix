'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import './scss/main.scss';

render(
  <Router history = {browserHistory}></Router>
  document.getElementById('app');
);
