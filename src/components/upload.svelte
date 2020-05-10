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
    border-bottom: 1px solid var(--color-slack-border);
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
    color: var(--color-slack-info);
    font-family: Consolas, monospace;
  }

  .status .icon {
    display: none;
    vertical-align: top;
    font-size: 0.9rem !important;
  }

  .upload.uploading .status .icon.uploading {
    display: inline-block;
  }

  .upload.error .status .icon.error {
    display: inline-block;
  }

  .upload.success .status .icon.success {
    display: inline-block;
  }

  .upload.uploading .status {
    color: var(--color-slack-info);
  }

  .upload.error .status {
    color: var(--color-slack-error);
  }

  .upload.success .status {
    color: var(--color-slack-success);
  }
</style>

<li
  class="upload"
  class:uploading={status.type === 'uploading'}
  class:error={status.type === 'error'}
  class:success={status.type === 'success'}>
  <img class="preview" src={filePreview} alt="" />
  <span class="filename">{upload.file.name}</span>
  <span class="status">
    <i class="icon uploading ts_icon ts_icon_spinner"></i>
    <i class="icon error ts_icon ts_icon_warning"></i>
    <i class="icon success ts_icon ts_icon_check_circle_o"></i>
    <span class="text">{status.message}</span>
  </span>
</li>