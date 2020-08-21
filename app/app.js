'use strict';

var angularRoutingApp = angular.module('myApp', ['ngRoute', 'dndLists', 'ngStorage']);

angularRoutingApp.config(function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'homeController'
  }).otherwise({
    redirectTo: '/'
  });
});

angularRoutingApp.controller('homeController', function ($scope, $location, $localStorage) {

  //validando el storage
  if ($localStorage.column !== undefined) {
    $scope.column = $localStorage.column
  } else {
    $scope.column = [];
  }

  //clon para el filtrado
  $scope.filteredData = $scope.column;


  // funciones

  //crud
  $scope.addColumn = function () {
    $scope.column.push({ nameColumn: '', card: [] });
    $scope.inputColumn = true;
    $localStorage.column = $scope.column;
  }

  $scope.addCards = function (list) {
    list.card.push({})
    $scope.inputCard = true;
    $localStorage.column = $scope.column;
  }

  $scope.deleteColumn = function (index) {
    $scope.column.splice(index, 1);
    $localStorage.column = $scope.column;
  }

  $scope.deleteCard = function (list, index) {
    list.splice(index, 1);
    $localStorage.column = $scope.column;
  }

  //actiones
  $scope.beforeClickName = function (list) {
    if (list.nameColumn == '') {
      $scope.column.pop();
    }
    $localStorage.column = $scope.column;
  }

  $scope.beforeClickCard = function (item, list) {
    if (item.title == undefined) {
      list.pop();
    }
    //actualizando storage
    $localStorage.column = $scope.column;
  }


  $scope.search = function () {
    $scope.inputCard = false;
    $scope.inputColumn = false;

    //filtrar en el array por el name
    var searchValue = document.getElementById("search").value.toLowerCase();
    var filteredQuotes = $localStorage.column.filter(card => {
      if (card.nameColumn.toString().toLowerCase().indexOf(searchValue) !== -1) {
        return true;
      }
    });
    $scope.column = filteredQuotes
  }

});

angularRoutingApp.directive('focusMe', function ($timeout) {
  return {
    scope: { trigger: '@focusMe' },
    link: function (scope, element) {
      scope.$watch('trigger', function (newVal) {
        if (newVal === "true") {
          // console.log('trigger',value);
          $timeout(function () {
            for(const item of element[0].classList) {
              if(item == 'ng-empty'){
                element[0].focus();
              }
              if(item == 'ng-not-empty'){
                element[0].blur();
              }
            }
          });
        }
      });
    }
  };
});

angularRoutingApp.directive('focusInput', function ($timeout) {
  return {
    link: function (scope, element, attrs) {
    scope.$watch(attrs.focusInput, function (newVal) {
        if (newVal === true) {
         
          $timeout(function () {
            for( const item of element[0].classList) {
              if(item == 'ng-empty'){
                element[0].focus();
              }
              if(item == 'ng-not-empty'){
                element[0].blur();
              }
            }
          });

        }
      });
    }
  };
});