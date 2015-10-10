import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import each from 'lodash/collection/each';

import Dropzone from 'react-dropzone';

var add_emoji_form = document.querySelector('#addemoji');
var container_div = document.createElement('div');

add_emoji_form.appendChild(container_div);

var Test = React.createClass({
  _getHiddenFormData: function () {
    var add_emoji_form = document.querySelector('#addemoji');
    var hidden_form_data = {};
    each(add_emoji_form.elements, function (element) {
      if (element.type === 'hidden'){
        hidden_form_data[element.name] = element.value;
      }
    });
    return hidden_form_data;
  },
  handleDrop: function (files) {
    var hidden_form_data = this._getHiddenFormData();
    for (let file of files) {
      var emoji_name = file.name.split('.')[0];
      var image_upload_request = superagent.post('/customize/emoji')
        .withCredentials()
        .field('name', emoji_name)
        .field('mode', 'data')
        .attach('img', file);
      each(hidden_form_data, function (value, name) {
        image_upload_request.field(name, value)
      });
      image_upload_request.end(function (error, response) {
        console.log('end', error, response);
      });
    }
    console.log('arguments', arguments);
  },
  render: function () {
    return (
      <div className="slack-emoji-utils">
        <img src="http://orig14.deviantart.net/da63/f/2009/242/1/7/ditto_scratch_sprite_by_starrmyt.png" />
        <Dropzone onDrop={this.handleDrop}>
          Drop an image in here!
        </Dropzone>
      </div>
    );
  }
})

ReactDOM.render(<Test />, container_div);
