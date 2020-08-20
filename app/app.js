'use strict';

var angularRoutingApp = angular.module('myApp', ['ngRoute']);


angularRoutingApp.config(function ($routeProvider) {
  // Routes will be here
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'homeController'
  }).otherwise({
    redirectTo: '/'
  });
});

angularRoutingApp.controller('homeController', function ($scope, $location) {
  console.log("entrando")

    
  $scope.column = [
    {
      nameColumn: 'prueba1',
      card:[
        { title: 'card 1' },
      ]
    }, {
      nameColumn: 'prueba2',
      card:[
        { title: 'card 1' },
      ]
    }, {
      nameColumn: 'prueba3',
      card:[
        { title: 'card 1' },
        { title: 'card 2' },
        { title: 'card 3' }
      ]
    }
  ];



  // funciones

  //crud
  $scope.addColumn = function () { 
    $scope.column.push({nameColumn: '', card: []});
    $scope.shouldBeOpen = true;
  }
  
  $scope.addCards = function (list) { 
    list.card.push({})
  }

  $scope.deleteColumn = function (index) { 
    $scope.column.splice(index,1);
  }

  $scope.deleteCard = function (list, index) { 
    list.splice(index,1);
  }


  //actiones
  $scope.beforeClickName = function (list) { 
    if(list.nameColumn == ''){
      $scope.column.pop();
      console.log($scope.column);
    }
  }

  
});

angularRoutingApp.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '@focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") { 
          // console.log('trigger',value);
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
    }
  };
});
