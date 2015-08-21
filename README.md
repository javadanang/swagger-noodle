The swagger-noodle is the simple node.js module that wraps the configuration for using swagger-tools more easier. It allows you to change the configuration parameters at the require command.

## Installation

Installation for Node.js applications can be done via [NPM][npm].

```
npm install swagger-noodle --save
```

## Example

``` javascript
var express = require("express");
var app = express();

// some configuration for app here

var swagger = require('swagger-noodle')({
  API_SPEC_FILE: __dirname + '/api/swagger.json',
  CONTROLLERS_DIR: __dirname + '/controllers',
  MOCK_MODE: true
});
app.use(swagger);

// other configuration for app

var server = app.listen(8080, function () {
  console.log('Swagger-UI is available on http://localhost:%d/docs', 8080);
});
```

[npm]: https://www.npmjs.com/package/swagger-noodle
[swagger]: http://swagger.io
[swagger-tools]: https://github.com/apigee-127/swagger-tools
[swagger-ui]: https://github.com/swagger-api/swagger-ui
