import React from 'react';
import cx from 'classnames';
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
      var status = upload.success ?
        'Complete' :
        upload.error ?
          upload.error :
          'Uploading...';
      var upload_classes = cx({
        set__uploader__upload: true,
        'set__uploader__upload--success': upload.success,
        'set__uploader__upload--error': !!upload.error
      });
      return (
        <li className={upload_classes} key={upload.id}>
          <img className="set__uploader__upload__preview" src={upload.file.preview} />
          <span className="set__uploader__upload__filename">{upload.file.name}</span>
          <span className="set__uploader__upload__status">
            <i className="set__uploader__upload__status__icon set__uploader__upload__status__icon-uploading ts_icon ts_icon_spinner" />
            <i className="set__uploader__upload__status__icon set__uploader__upload__status__icon-error ts_icon ts_icon_warning" />
            <i className="set__uploader__upload__status__icon set__uploader__upload__status__icon-success ts_icon ts_icon_check_circle_o" />
            {status}
          </span>
        </li>
      );
    });
  },
  render: function () {
    return (
      <div className="slack-emoji-tools">
        <h4 className="set__uploader__heading">Bulk Emoji Uploader</h4>
        <p className="set__uploader__subheading">Drag and drop images into the area below. Any images dropped there will be automatically uploaded using their filename as the emoji name.</p>
        <p className="set__uploader__input-note input_note">Example: <span className="normal">"ditto.gif" will be added as "ditto"</span></p>
        <Dropzone className="set__uploader__dropzone" activeClassName="set__uploader__dropzone--active" onDrop={this.handleDrop}>
          <div className="set__uploader__dropzone__content input_note"><strong>Drop images here</strong> or click to open a file dialog</div>
        </Dropzone>
        <ul className="set__uploader__uploads">{this.renderUploads()}</ul>
      </div>
    );
  }
});

export default Uploader;
