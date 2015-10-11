import React from 'react';
import ReactDOM from 'react-dom';

import Uploader from './components/Uploader.jsx';

var add_emoji_form = document.querySelector('#addemoji');
var container_div = document.createElement('div');

add_emoji_form.appendChild(container_div);

ReactDOM.render(<Uploader />, container_div);
