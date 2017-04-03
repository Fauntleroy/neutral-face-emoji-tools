import React from 'react';
import cx from 'classnames';
import findIndex from 'lodash/array/findIndex';
import forEach from 'lodash/collection/forEach';

import { uploadEmoji } from '../services/upload.js';

class Download extends React.Component {
  constructor() {
    super();

    this.state = {
      emojis: null,
    }
  }
  componentDidMount() {
    this.generateEmojis();
  }
  generateEmojis() {
    const rows = document.getElementsByClassName('emoji_row');
    const emojis = [];

    forEach(rows, (s) => {
      let trimmedName = /^:([a-z0-9\-\_]+):/i.exec(s.innerText);
      let trimmedUrl = /(https?:\/\/.*\.(?:png|jpg|gif))/.exec(s.cells[0].children[0].outerHTML);

      emojis.push(
        {
          name: trimmedName[1] ? trimmedName[1] : s.innerText,
          url: trimmedUrl[1] ? trimmedUrl[1] : s,
        });
    });

    this.setState({ emojis: emojis });
  }
  downloadEmojis(e) {
    const { emojis } = this.state;

    e.preventDefault();
    console.log('downloading');
    console.log('emojis in download', emojis);
    forEach(emojis, (e) => {
      let element = document.createElement('a');
      element.setAttribute('href', e.url);
      element.setAttribute('download', e.name);

      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    })


  }
  render() {
    const { emojis } = this.state;
    return (
      <div className="slack-emoji-tools">
        <h4 className="set__uploader__heading">Bulk Emoji Downloader</h4>
        <button
          onClick={(e) => this.downloadEmojis(e)}
        >
          Click here to download emojis
        </button>
      </div>
    );
  }
}
export default (Download);