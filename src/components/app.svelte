<script>
  import { onMount } from 'svelte';
  import { fromEvent } from 'file-selector';

  import Upload from './upload.svelte';

  import uploadEmoji from '../upload-emoji.js';

  const SET_ICON_URL = chrome.runtime.getURL('images/icon_128.png');

  let uploadZoneElement;
  let uploadInputElement;
  let uploads = [];
  let uploadsStatusById = {};
  let isOverDropZone = false;

  function uploadFiles (files) {
    files.forEach(file => {
      const id = uploadEmoji(file, (error) => {
        if (error) {
          uploadsStatusById = {
            ...uploadsStatusById,
            [id]: {
              type: 'error',
              message: error.message || error
            }
          };
        } else {
          uploadsStatusById = {
            ...uploadsStatusById,
            [id]: {
              type: 'success',
              message: 'Successfully Uploaded.'
            }
          };
        }
      });
      uploadsStatusById = {
        ...uploadsStatusById,
        [id]: {
          type: 'uploading',
          message: 'Uploading...'
        }
      };
      uploads = [...uploads, {
        file,
        id
      }];
    });
  }

  async function handleDrop (event) {
    event.preventDefault();
    isOverDropZone = false;

    const files = await fromEvent(event);
    uploadFiles(files);
  }

  async function handleFileChange (event) {
    event.preventDefault();
    const files = await fromEvent(event);
    uploadFiles(files);
  }

  function handleDragOver (event) {
    event.preventDefault();
    isOverDropZone = true;
  }

  function handleDragLeave () {
    isOverDropZone = false;
  }
</script>

<style>
  .dropzone {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    margin: 0 0 10px 0;
    width: 100%;
    height: 150px;
    border: black 3px dashed;
    border-radius: 5px;
    background: gray;
    transition: background 450ms, border-color 450ms;
  }

  .dropzone.over {
    background: blue;
    border-color: darkblue;
  }
</style>

<div class="neutral-face-emoji-tools">
  <h4 class="heading">
    <img class="heading__icon" src="{SET_ICON_URL}" alt="" />
    <span class="heading__text">Bulk Emoji Uploader</span>
  </h4>
  <p class="subheading">Drag and drop images into the area below. Any images dropped there will be automatically uploaded using their filename as the emoji name.</p>
  <p class="input-note">Example: <span class="normal">"ditto.gif" will be added as "ditto"</span></p>
  <div
    id="upload-zone"
    class="dropzone"
    class:over={isOverDropZone}
    on:drop={handleDrop}
    on:dragover={handleDragOver}
    on:dragleave={handleDragLeave}
    bind:this={uploadZoneElement}>
    <div class="dropzone__content input_note">
      <strong>Drop images here</strong> or click to open a file dialog
    </div>
    <input
      class="dropzone__input"
      id="upload-input"
      type="file"
      on:change={handleFileChange}
      bind:this={uploadInputElement} />
  </div>
  <ul class="uploads">
    {#each uploads as upload (upload.id)}
      <Upload upload={upload} status={uploadsStatusById[upload.id]} />
    {/each}
  </ul>
</div>