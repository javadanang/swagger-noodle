'use strict';

var connect = require('connect');
var swaggerTools = require('swagger-tools');
var path = require('path');

module.exports = function(config, app) {
  app = app || connect();

  // swaggerRouter configuration
  var swaggerRouterOpts = {
    useStubs: config.MOCK_MODE || (process.env.NODE_ENV === 'development')
  };
  if (config.CONTROLLERS_DIR) {
    swaggerRouterOpts['controllers'] = config.CONTROLLERS_DIR;
  }

  // The Swagger ApiSpec document
  var swaggerApiSpec = require(config.API_SPEC_FILE || './api/swagger.json');

  // Initialize the Swagger middleware
  swaggerTools.initializeMiddleware(swaggerApiSpec, function (middleware) {
    // Interpret Swagger resources and attach metadata to request
    // - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(swaggerRouterOpts));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
  });

  return app;
}