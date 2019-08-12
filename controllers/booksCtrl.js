const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const ULID = require('ulid');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({
  name: 'bookshelf-api',
  level: 'debug',
  serializers: bunyan.stdSerializers
});

exports.list = function(req, res) {
  var params = {
    TableName: "BookTable"
  }

  documentClient.scan(params, function(err, data) {
    if (err) {
      logger.debug(err, err.stack);
      res.status(500).json({
        status: 500,
        message: err
      })
    } else {
      res.json(data);
    }
  })
}

exports.get = function(req, res) {
  var params = {
    Key: {
      "id": req.params.id
    },
    TableName: "BookTable"
  }

  documentClient.get(params, function(err, data) {
    if (err) {
      logger.debug(err, err.stack);
      res.status(500).json({
        status: 500,
        message: err
      })
    } else {
      res.json(data.Item);
    }
  })
};

exports.add = function(req, res) {
  var params = {
    Item: { id: ULID.ulid(), ...req.body },
    TableName: "BookTable"
  }

  documentClient.put(params, function(err, data) {
    if (err) {
      logger.debug(err, err.stack);
      res.status(500).json({
        status: 500,
        message: err
      })
    } else {
      res.json(data.Item);
    }
  })
};

exports.update = function(req, res) {
  var params = {
    Item: { id: req.params.id, ...req.body },
    TableName: "BookTable"
  }

  documentClient.put(params, function(err, data) {
    if (err) {
      logger.debug(err, err.stack);
      res.status(500).json({
        status: 500,
        message: err
      })
    } else {
      res.json(data.Item);
    }
  })
};

exports.delete = function(req, res) {
  var params = {
    Key: { 
      id: req.params.id
    },
    TableName: "BookTable"
  }

  documentClient.delete(params, function(err, data) {
    if (err) {
      logger.debug(err, err.stack);
      res.status(500).json({
        status: 500,
        message: err
      })
    } else {
      res.json(data.Item);
    }
  })
};
