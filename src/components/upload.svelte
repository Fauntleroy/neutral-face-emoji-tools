<script>
  export let upload;
  export let status;

  const filePreview = window.URL.createObjectURL(upload.file);

  console.log('upload', upload);
</script>

<style>
  .upload {
    display: flex;
    align-items: center;
    border-bottom: 1px solid --color-slack-border;
  }

  .upload:last-child {
    border-bottom: none;
  }

  .preview {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.5em;
  }

  .filename {
    font-weight: bold;
    margin-right: 1em;
  }

  .status {
    color: --color-slack-info;
  }

  .status__icon {
    display: none;
    vertical-align: top;
    margin-right: 0.25em;
    font-size: 0.9rem !important;
  }

  .status__icon-uploading {
    display: inline-block;
  }

  /* .upload--success,
  .upload--error {
    .status__icon-uploading {
      display: none;
    }
  }

  .upload--success {
    .status {
      color: --color-slack-success;
    }

    .status__icon-success {
      display: inline-block;
    }
  }

  .upload--error {
    .status {
      color: --color-slack-error;
    }

    .status__icon-error {
      display: inline-block;
    }
  } */
</style>

<li class="upload" id={upload.id}>
  <img class="preview" src={filePreview} alt="" />
  <span class="filename">{upload.file.name}</span>
  <span class="status">
    <i class="status__icon status__icon-uploading ts_icon ts_icon_spinner"></i>
    <i class="status__icon status__icon-error ts_icon ts_icon_warning"></i>
    <i class="status__icon status__icon-success ts_icon ts_icon_check_circle_o"></i>
    <span class="status__text">{status.message}</span>
  </span>
</li>