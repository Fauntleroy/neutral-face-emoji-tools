import React from 'react';
import findIndex from 'lodash/array/findIndex';

import { uploadEmoji } from '../services/upload.js';

import Dropzone from 'react-dropzone';

var Uploader = React.createClass({
  getInitialState: function () {
    return {
      queue: []
    };
  },
  handleDrop: function (files) {
    files.forEach(file => {
      var id = uploadEmoji(file, (error, response) => {
        var queue = [...this.state.queue];
        var index = findIndex(queue, upload => upload.id === id);
        var current_upload = queue[index];
        queue[index] = {
          ...current_upload,
          error,
          success: !error
        };
        this.setState({ queue });
      });
      setTimeout(() => {
        this.setState({ queue: [...this.state.queue, {
          id,
          file,
          success: null,
          error: null
        }]});
      }, 0);
    });
  },
  renderUploads: function () {
    return this.state.queue.map(upload => {
      return (
        <li key={upload.id}>
          <img src={upload.file.preview} /> {upload.file.name} - {upload.success && 'done'} - {upload.error}
        </li>
      );
    });
  },
  render: function () {
    return (
      <div className="slack-emoji-utils">
        <img src="http://orig14.deviantart.net/da63/f/2009/242/1/7/ditto_scratch_sprite_by_starrmyt.png" />
        <Dropzone onDrop={this.handleDrop}>
          Drop an image in here!
        </Dropzone>
        <ul>{this.renderUploads()}</ul>
      </div>
    );
  }
});

export default Uploader;
