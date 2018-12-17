const express = require('express');
const otText = require('ot-text');
const redisPubSub = require('sharedb-redis-pubsub')('redis://localhost:6379');
const router = express.Router();
const ShareDB = require('sharedb');
const ShareDBMongo = require('sharedb-mongo')('mongodb://localhost:27017/aloft');

const shareDbOptions = {
  db: ShareDBMongo,
  pubsub: redisPubSub
};

const backend = new ShareDB(shareDbOptions);
ShareDB.types.register(otText.type);
const connection = backend.connect();

// Raw text API allows retrieval of raw transcript text.
router.get('/', (req, res) => {
  const doc = connection.get(req.query.user, req.query.job);

  const send200 = (res, message) => {
    if (message == null) message = `Sorry. There's either nothing here yet or this document doesn't exist.\n`;

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });

    res.end(message);
  };

  doc.fetch(err => {
    if (err) res.status(500).send('Sorry, there was an error retrieving that document.');
    send200(res, doc.data);
  });
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Upword.ly' });
});

router.delete('/', (req, res) => {
  const doc = connection.get(req.query.user, req.query.job);
  try {
    doc.fetch(err => {
      if (err) res.status(500).send('Sorry, there was an error in retrieving that document for deletion.');
      doc.del(err => {
        if (err) res.status(500).send('Sorry, there was an error in deleting that document.');
        doc.destroy();
        res.json('Job successfully deleted!');
      });
    });
  } catch (err) {
    res.status(500).send('Sorry. That document exist or is empty!');
  }
});

module.exports = router;
