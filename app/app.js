'use strict';

var angularRoutingApp = angular.module('myApp', ['ngRoute', 'dndLists', 'ngStorage']);


angularRoutingApp.config(function ($routeProvider) {
  // Routes will be here
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'homeController'
  }).otherwise({
    redirectTo: '/'
  });
});

angularRoutingApp.controller('homeController', function ($scope, $location, $localStorage) {
  console.log("entrando")
 
  //validando el storage
  if($localStorage.column !== undefined){
    $scope.column  = $localStorage.column 
  }else{
    $scope.column = [];
  }

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
    $localStorage.column = $scope.column;
  }

  $scope.deleteCard = function (list, index) { 
    list.splice(index,1);
    $localStorage.column = $scope.column;
  }  

  //actiones
  $scope.beforeClickName = function (list) { 
    if(list.nameColumn == ''){
      $scope.column.pop();
    }
    $localStorage.column = $scope.column;
  }
 
  $scope.beforeClickCard = function (item, list) { 
    if(item.title == undefined){
      list.pop();
    }
    //actualizando storage
    $localStorage.column = $scope.column;
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