let uploadElementId = 0;

export default function createUploadElement (file) {
  const filePreview = window.URL.createObjectURL(file);
  const element = document.createElement('li');
  element.id = `nfet__upload-${uploadElementId++}`;
  element.classList.add('nfet__uploader__upload');
  element.innerHTML = `
    <img class="nfet__uploader__upload__preview" src="${filePreview}" />
    <span class="nfet__uploader__upload__filename">${file.name}</span>
    <span class="nfet__uploader__upload__status">
      <i class="nfet__uploader__upload__status__icon nfet__uploader__upload__status__icon-uploading ts_icon ts_icon_spinner"></i>
      <i class="nfet__uploader__upload__status__icon nfet__uploader__upload__status__icon-error ts_icon ts_icon_warning"></i>
      <i class="nfet__uploader__upload__status__icon nfet__uploader__upload__status__icon-success ts_icon ts_icon_check_circle_o"></i>
      <span class="nfet__uploader__upload__status__text"></span>
    </span>`;

  return element;
}
