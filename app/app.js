'use strict';

var angularRoutingApp = angular.module('myApp', ['ngRoute', 'dndLists']);


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
    $scope.inputColumn = true;
  }
  
  $scope.addCards = function (list) { 
    list.card.push({})
    $scope.inputCard = true;
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
    }
  }
 
  $scope.beforeClickCard = function (item, list) { 
    if(item.title == undefined){
      list.pop();
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

angularRoutingApp.directive('focusInput', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focusInput, function(value) {
        if(value === true) { 
          console.log('value=',value);
          //$timeout(function() {
            element[0].focus();
            scope[attrs.focusMe] = false;
          //});
        }
      });
    }
  };
});