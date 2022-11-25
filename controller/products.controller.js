const elasticClient = require('../config/elastic.config');

exports.create = (req, res) => {

  elasticClient.index({
    index: 'products',
    body: {
      name: req.body
    }
  }).then((resp) => {
    console.log(resp);
    res.send(resp);
  }
  ).catch((err) => {
    console.log(err);
    res.send(err);
  }
  );
};
exports.findAll = (req, res) => {
  let query = {
    index: 'products',
  }
  if (req.query.product) query.q = `*${req.query.product}*`;
  elasticClient.search(query).then((resp) => {
    res.send(resp.hits.hits);
  }
  ).catch((err) => {
    console.log(err);
  }
  );

};
exports.findOne = (req, res) => {
  let query = {
    index: 'products',
    id : req.params.id
  }
  elasticClient.get(query).then((resp) => {
    res.send(resp);
  }
  ).catch((err) => {
    console.log(err);
  }
  );
};
exports.update = (req, res) => {
  elasticClient.update({
    index: 'products',
    id: req.params.id,
    body: {
      doc:req.body
    }
  }).then((resp) => {
    console.log(resp);
    res.send(resp);

  }
  ).catch((err) => {
    console.log(err);
    res.send(err);

  }
  );
  
};
exports.delete = (req, res) => {
  elasticClient.delete({
    index: 'products',
    id: req.params.id
  }).then((resp) => {
    console.log(resp);
    res.send(resp);

  }
  ).catch((err) => {
    console.log(err);
    res.send(err);

  }
  );
};
