import React from 'react';
import cx from 'classnames';
import findIndex from 'lodash/array/findIndex';
import forEach from 'lodash/collection/forEach';
import map from 'lodash/collection/map';
import last from 'lodash/array/last';
import JSZip from 'jszip';
import fileSaver from 'file-saver';

class Download extends React.Component {
  constructor() {
    super();

    this.state = {
      emojis: null,
      loading: true,
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
      let trimmedUrl = /(https?:\/\/.*\.(png|jpg|gif))/.exec(s.cells[0].children[0].outerHTML);

      emojis.push(
        {
          name: trimmedName[1] ? trimmedName[1] : s.innerText,
          url: trimmedUrl[1] ? trimmedUrl[1] : s,
          ext: '.'+last(trimmedUrl),
        });
    });

    this.setState({
      emojis: emojis,
      loading: false,
    });
  }
  downloadEmojis() {
    const { emojis } = this.state;

    this.setState({ loading: true });
    // for each emoji, send a request
    // anytime the request comes back, add that file's data to zip
    // when the last one is done, download the zip

    Promise.all(
      map(emojis, (e) => {
        return new Promise((resolve, _reject) => {
          const x = new XMLHttpRequest();
          x.open('GET', e.url);
          x.responseType = 'blob';
          x.onload = () => {
            const blob = x.response;
            const fr = new FileReader();
            fr.onloadend = () => {
              const buffer = fr.result;
              resolve({ name: e.name + e.ext , buffer });
            };
            fr.readAsArrayBuffer(blob);
          };
          x.send();
        });
      })
    )
    .then((buffers) => {
      const zip = new JSZip();
      forEach(buffers, ({ name, buffer }) => {
        zip.file(name, buffer);
      });
      return zip.generateAsync({type:"blob"});
    })
    .then((content) => {
      fileSaver.saveAs(content, "emojis.zip");
      this.setState({ loading: false });
    });
  }
  render() {
    const {
      emojis,
      loading,
    } = this.state;

    return (
      <div className="slack-emoji-tools">
        <h4>Bulk Emoji Downloader</h4>
        <p>
          Generate and download a zip file containing all {emojis.length} of your emojis for this Slack group.
        </p>
        {!loading ? (
          <div>
            <a
              className="btn btn_primary"
              onClick={() => this.downloadEmojis()}
            >
              Download Emojis
            </a>
          </div>
          ) : (
            <p>Loading...</p>
          )
        }
      </div>
    );
  }
}
export default (Download);