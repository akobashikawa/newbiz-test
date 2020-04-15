var express = require('express');
var router = express.Router();

const axios = require('axios');

router.get('/api', function(req, res, next) {
  res.json({
    status: 'active'
  });
});

router.all('/api/request', async (req, res, next) => {
  const method = req.method;

  const query = req.query;

  const url = req.query['url'] || null;
  if (!url) {
    res.status(402).json({
      message: 'Indicar url en el query'
    });
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (headers['authorization']) {
    headers['Authorization'] = req.headers['authorization'];
  }
  
  console.log({url, query, headers});
  switch (method) {
    case 'GET':
      try {
        const response = await axios({method, url, headers});
        return res.end(response.data);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'POST':
      const data = req.body;
      try {
        const response = await axios({ method, url, headers, data });
        return res.end(response.data);
      } catch (error) {
        console.log(error.response ? error.response : error);
        res.status(error.response.status).json(error.response.statusText);
      }
      break;
  }
});

module.exports = router;
