<script>
  export let upload;
  export let status;

  const filePreview = window.URL.createObjectURL(upload.file);
</script>

<style>
  .upload {
    display: flex;
    align-items: center;
    padding: 2px 0 1px 0;
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
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-slack-info);
    font-family: Consolas, monospace;
  }

  .status .icon {
    display: none;
    margin-right: 0.25em;
  }

  .status .icon:before {
    display: block;
  }

  .upload.uploading .status .icon.uploading {
    display: block;
  }

  .upload.error .status .icon.error {
    display: block;
  }

  .upload.success .status .icon.success {
    display: block;
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