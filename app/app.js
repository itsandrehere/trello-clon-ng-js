'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.home'
])

.config(['$routeProvider', function ($routeProvider) {
  // Routes will be here
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}]);