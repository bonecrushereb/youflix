const angular = require('angular');
const youflixApp = angular.module('youflixApp');

require('./controllers')(youflixApp);
require('./directives')(youflixApp);
require('./services')(youflixApp);
