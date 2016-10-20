
    var app = angular.module('myapp', []);

    app.controller("mycontroller", function($scope) {
        $scope.value = 'Hey mate!! am loaded from angular';
    });
    console.log('A message from inside myscript.js');
