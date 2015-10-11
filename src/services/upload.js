import superagent from 'superagent';
import each from 'lodash/collection/each';
import uuid from 'uuid';

const NO_OP = function () {};

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
  uploadEmoji: function (file, callback = NO_OP) {
    var hidden_form_data = upload_service._getHiddenFormData();
    var id = uuid.v4();
    var name = file.name.split('.')[0];
    var image_upload_request = superagent.post('/customize/emoji')
      .withCredentials()
      .field('name', name)
      .field('mode', 'data')
      .attach('img', file);
    each(hidden_form_data, function (value, name) {
      image_upload_request.field(name, value)
    });
    image_upload_request.end(function (error, response) {
      callback(error, response);
    });
    return id;
  }
};

export default upload_service;
