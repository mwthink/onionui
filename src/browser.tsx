import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

render(
  <App/>
  ,appTarget
)
