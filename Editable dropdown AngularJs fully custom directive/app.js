(function() {
    'use strict';

    angular
        .module('myApp', ['inputDropdownListDirectiveModule', 'ngAnimate'])
        .controller('myAppCtrl', ['$scope', myAppCtrl]);

    function myAppCtrl($scope) {
        $scope.persons = ['Emil', 'Janos', 'Vasile', 'Mircea', 'Adrian', 'Lehel', 'Tamas', 'Andras', 'Zoltan', 'Andrei', 'Radu', 'Razvan', 'Catalin', 'Eric', 'Raul', 'Claudiu'];
        $scope.person = 'Emil';

        $scope.people = [
            {
                id: 1,
                name: 'John'
            },
            {
                id: 2,
                name: 'Aron'
            },
            {
                id: 3,
                name: 'Michael'
            }, {
                id: 4,
                name: 'Jack'
            }
        ];

        $scope.personObj = 'Jack';

        $scope.textChanged = function (){
            console.log('text changed');
        };

        $scope.optionSelected = function (){
            console.log('option selected');
        };
    }
})();