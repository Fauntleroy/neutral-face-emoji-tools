import React from 'react';
import ReactDOM from 'react-dom';

import CSSLoaded from './styles/content.less';

import Uploader from './components/uploader.jsx';
import Downloader from './components/downloader.jsx';

var add_emoji_form = document.querySelector('#addemoji');
var container_div = document.createElement('div');

add_emoji_form.appendChild(container_div);

ReactDOM.render((
  <div>
    <hr />
    <Uploader />
    <hr />
    <Downloader />
  </div>
), container_div);
