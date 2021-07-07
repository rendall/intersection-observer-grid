import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {VirtualGrid} from './components/VirtualGrid'
const e = React.createElement;

const domContainer = document.querySelector('#react-app');
ReactDOM.render(e(VirtualGrid), domContainer);
