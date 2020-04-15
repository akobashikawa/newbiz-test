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
        return res.json(response.data);
      } catch (error) {
        console.log(error.response ? error.response : error);
        res.status(error.response.status).json(error.response.statusText);
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

router.post('/newbiz/api.security/v1/security', async (req, res, next) => {
  const method = req.method;
  const url = 'https://apitestenv.vnforapps.com/api.security/v1/security';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': req.headers['authorization']
  };

  console.log(req.body, req.headers);
  const data = req.body;
  
  console.log({ url, headers, data });
  try {
    const response = await axios({ method, url, headers, data });
    return res.end(response.data);
  } catch (error) {
    // console.log(error.response ? error.response : error);
    res.status(error.response.status).json(error.response.statusText);
  }
});

router.post('/newbiz/api.ecommerce/v2/ecommerce/token/session/:merchantId', async (req, res, next) => {
  const method = req.method;
  const merchantId = req.params['merchantId'];
  if (!merchantId) {
    return res.status(402).json({
      message: 'Indicar merchantId en el query'
    });
  }

  const url = `https://apitestenv.vnforapps.com/api.ecommerce/v2/ecommerce/token/session/${merchantId}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': req.headers['authorization']
  };

  console.log(req.body, req.headers);
  const data = req.body;
  
  console.log({ url, headers, data });
  try {
    const response = await axios({ method, url, headers, data });
    return res.json(response.data);
  } catch (error) {
    res.end(error);
  }
});

router.all('/checkout', (req, res, next) => {
  const method = req.method;
  const query = req.query || undefined;
  const header = req.header;
  const params = req.params || undefined;
  const body = req.body || undefined;
  console.log({method, query, header, params, body});
  res.json({
    method, query, params, body,
  });
});

router.all('/timeout', (req, res, next) => {
  const method = req.method;
  const query = req.query || undefined;
  const header = req.header;
  const params = req.params || undefined;
  const body = req.body || undefined;
  console.log({method, query, header, params, body});
  res.json({
    method, query, params, body,
  });
});

module.exports = router;
