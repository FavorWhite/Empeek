/// <reference path="../Users/users.html" />
/// <reference path="../Users/users.html" />
angular.module('Routing', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/users', {
          templateUrl: 'Scripts/Users/users.html',
          controller: 'userController'
      })
      .when('/pets/:id', {
          templateUrl:'Scripts/Pets/pets.html',
          controller: 'petController'
      })
      .otherwise({
          redirectTo: '/users'
      });
  }]);