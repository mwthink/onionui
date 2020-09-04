import * as React from 'react';
import { render } from 'react-dom';
import App from './App';

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);

const storageProvider = {
  save: async (key:string, value:string) => {
    localStorage.setItem(key, value);
  },
  get: async (key:string) => {
    return localStorage.getItem(key);
  },
}

render(
  <App storage={storageProvider}/>
  ,appTarget
)
