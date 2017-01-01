import Bottleneck from 'bottleneck'
import superagent from 'superagent';
import each from 'lodash/collection/each';
import strip from 'strip';

const NO_OP = function () {};
const limiter = new Bottleneck(3, 75);

var upload_service = {
  _getHiddenFormData: function () {
    var add_emoji_form = document.querySelector('#addemoji');
    var hidden_form_data = {};
    each(add_emoji_form.elements, function (element) {
      if (element.type === 'hidden'){
        hidden_form_data[element.name] = element.value;
      }
    });
    return hidden_form_data;
  },
  _extractError: function (response_text) {
    var error_html = (/<p class=\"alert alert_error\">(.*)<\/p>/.exec(response_text) || [])[1];
    var error_text = strip(error_html || '') || null;
    return error_text;
  },
  uploadEmoji: function (file, callback = NO_OP) {
    limiter.submit(upload_service._uploadEmoji, file, callback);
  },
  _uploadEmoji: function (file, callback = NO_OP) {
    var hidden_form_data = upload_service._getHiddenFormData();
    var name = file.name.split('.')[0];
    var image_upload_request = superagent.post('/customize/emoji')
      .withCredentials()
      .field('name', name)
      .field('mode', 'data')
      .attach('img', file);
    each(hidden_form_data, (value, name) => {
      image_upload_request.field(name, value)
    });
    image_upload_request.end((error, response) => {
      const response_error = error
        ? `HTTP ${error.status}`
        : upload_service._extractError(response.text);

      callback(response_error, response);
    });
  }
};

export default upload_service;
