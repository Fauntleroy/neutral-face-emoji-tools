import React from 'react';
import cx from 'classnames';
import findIndex from 'lodash/array/findIndex';
import forEach from 'lodash/collection/forEach';
import axios from 'axios';

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
    forEach(emojis, (e) => {
      let x = new XMLHttpRequest();
      x.open('GET', e.url);
      x.responseType = 'blob';
      x.onload = function() {
          let blob = x.response;
          let fr = new FileReader();
          fr.onloadend = function() {
            let base64 = fr.result;
            let link = document.createElement("a");
            link.setAttribute("href", base64);
            link.setAttribute("download", e.name);
            link.click();
          };
          fr.readAsDataURL(blob);
      };
      x.send();
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