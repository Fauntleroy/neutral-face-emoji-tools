export const domReady = new Promise(resolve => {
  if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', resolve);
  }
  else {
    resolve();
  }
});

export const windowReady = new Promise(resolve => {
  if (document.readyState === 'complete') {
    resolve();
  }
  else {
    window.addEventListener('load', resolve);
  }
});
