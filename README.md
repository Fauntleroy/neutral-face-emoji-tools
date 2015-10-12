## Slack Emoji Tools

Drag and drop all your emoji.

![Demo GIF](demo.gif)

-----

### Installation

When this is added to the Chrome Web Store, this section will be written.

-----

### Usage

To use this extension, simply navigate to the /customize/emoji page of your Slack. There should be a new section called "Bulk Emoji Uploader" under the "💁 Emoji" tab. Once there, just drag and drop the images you want into the drop zone.

**Note: Make sure your files are named appropriately before uploading them!**

-----

### Developing

To work on this extension you'll need [Node.js](https://nodejs.org) and [NPM](https://www.npmjs.com/) installed.

#### Running the extension in dev mode

Follow these steps to get your dev workflow in order:

- Clone this repository
- Install the dev scripts with `npm install`
- Run `npm run build` to build the distributable files
- Go to [chrome://extensions](chrome://extensions) in Google Chrome
- Click "Load unpacked extension..." (*make sure "Developer Mode" is checked*)
- Select the `dist/` directory in your Slack Emoji Tools repo

Once you've done all these things, the extension should appear in your extensions list. If you want to actively work on the extension, run `npm run dev`—this will watch the `src/` directory for changes and update the contents of `dist/` automatically. You will then need to go to the [chrome://extensions/](chrome://extensions) page, manually reload the extension, and refresh the page.
