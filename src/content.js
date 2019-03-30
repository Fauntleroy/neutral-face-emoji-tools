import elementReady from 'element-ready';
import get from 'lodash.get';
import queue from 'queue';
import { SimpleDropzone } from 'simple-dropzone';
import uploadEmoji from './upload-emoji';
import './styles/content.less'; // Just to get it into the parcel build
import getSlackErrorMessage from './slack-error-messages';
import * as UI from './ui';

const ELEMENT_TO_INSERT_BEFORE_SELECTOR = '.p-customize_emoji_wrapper';


elementReady(ELEMENT_TO_INSERT_BEFORE_SELECTOR).then(element => {
  UI.injectStyling();
  UI.addContainerDiv(element);

  const uploadInputElement = document.querySelector('#nfet-upload-input');
  const uploadZoneElement = document.querySelector('#nfet-upload-zone');
  const dropzone = new SimpleDropzone(uploadZoneElement, uploadInputElement);
  const uploadsElement = document.querySelector('.neutral-face-emoji-tools .nfet__uploader__uploads');
  const q = queue({ concurrency: 5 });

  dropzone.on('drop', ({ files }) => {
    files.forEach(file => {
      const uploadElement = new UI.UploadElement(file);
      uploadsElement.appendChild(uploadElement.element);

      q.push(callback => {
        uploadEmoji(file)
          .then(response => {
            const ok = get(response, ['data', 'ok']);
            if (ok) {
              successfulUpload(uploadElement);
            }
            else {
              const error = get(response, ['data', 'error']);
              failedUpload(uploadElement, error);
            }
          })
          .catch(error => {
            failedUpload(uploadElement, error);
          })
          .finally(() => {
            callback();
          });
      });
    });
    q.start();
  });
});

function successfulUpload(element) {
  element.classList.add('nfet__uploader__upload--success');
  element.querySelector('.nfet__uploader__upload__status__text').innerText = 'Added successfully';
}

function failedUpload(element, error) {
  const errorMessasge = getSlackErrorMessage(error);
  element.classList.add('nfet__uploader__upload--error');
  element.querySelector('.nfet__uploader__upload__status__text').innerText = errorMessasge;
  console.log('Failed Upload', error);
}
