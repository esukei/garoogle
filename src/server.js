'use strict';

const express = require('express');
const bodyParser = require('body-parser');

let lastUpdated;

function init(ee) {
  const app = express();

  app.use(bodyParser());

  app.get('/api/health', (req, res) => res.status(200).json({ lastUpdated }));
  app.post('/api/google/event', (req, res) => {
    const state = req.headers['x-goog-resource-state'];

    ee.emit('onFetchList', {
      channelId: req.headers['x-goog-channel-id'],
      resourceId: req.headers['x-goog-resource-id']
    });

    return res.status(200).send(':)');
  });

  app.listen(3000, () => {
    console.log('Started on PORT 3000');
  });
}

function updateLastUpdated(d) {
  lastUpdated = d;
}

module.exports = {
  init,
  updateLastUpdated
};
