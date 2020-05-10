import _ from 'lodash';
// import superagent from 'superagent';
// import SuperagentThrottle from 'superagent-throttle';
import axios from 'axios';
import uuid from 'uuid';

import getSlackApiData from './get-slack-api-data';

const NO_OP = function () {};

// const superagentThrottle = new SuperagentThrottle({
//   active: true,
//   concurrent: 5,
//   rate: Infinity
// });

export default function uploadEmoji (file, callback = NO_OP) {
  const { apiToken, versionUid } = getSlackApiData();
  const timestamp = Date.now() / 1000;  
  const version = versionUid ? versionUid.substring(0, 8) : 'noversion';
  const id = uuid.v4();
  const name = file.name.split('.')[0];

  const formData = new FormData();
  formData.append('name', name);
  formData.append('mode', 'data');
  formData.append('token', apiToken);
  formData.append('image', file);

  axios({
    method: 'post',
    url: `https://creativemorningsww.slack.com/api/emoji.add`,
    params: {
      '_x_id': `${version}-${timestamp}`
    },
    data: formData,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).catch((error) => {
    callback(error, null);
  }).then((response) => {
    const error = _.get(response, 'data.error');
    console.log('response', response)
    callback(error, response);
  });

  return id;
}