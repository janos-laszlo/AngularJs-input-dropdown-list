(function () {
    'use strict';

    angular
        .module('inputDropdownListDirectiveModule', [])
        .directive('inputDropdownList', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/inputDropdownListDirective/inputDropdownListTemplate.html',
            scope: {
                optionsArray: '=optionsArray',
                boundVariable: '=boundVariable',
                propertyName: '@',
                onTextChanged: '&',
                onOptionSelected: '&'
            },
            link: function (scope, element, attributes) {
                scope.element = element;
                scope.placeholder = attributes.placeholder;
            },
            controller: ['$scope', function ($scope) {
                var optionsHeight = 0,
                    optionHeight = 0,
                    scrollTop = 0;

                $scope.isArrayOfPrimitives = true;
                $scope.model = {};

                (function init() {
                    if (!$scope.optionsArray) {
                        $scope.optionsArray = [];
                    }
                    if (!$scope.boundVariable) {
                        $scope.boundVariable = "";
                    }

                    $scope.model = {
                        isHidden: true,
                        boundVariable: $scope.boundVariable,
                        visibleOptions: [],
                        highlightedOptionIndex: 0
                    };

                    var unregister = $scope.$watch('optionsArray.length', function () {
                        // Array of objects.
                        if ($scope.optionsArray.length) {
                            if ($scope.propertyName &&
                                Object.prototype.toString.call($scope.optionsArray) === '[object Array]' &&
                                $scope.optionsArray.length > 0 &&
                                $scope.optionsArray[0].hasOwnProperty($scope.propertyName)) {

                                $scope.isArrayOfPrimitives = false;

                                setObjectOptionsVisibility();
                                // Array of primitives.
                            } else {
                                $scope.isArrayOfPrimitives = true;

                                setPrimitiveOptionsVisibility();
                            }

                            unregister();
                        }
                    });
                })();

                // public
                $scope.optionSelected = optionSelected;
                $scope.textChanged = textChanged;
                $scope.keydown = keydown;

                function optionSelected(value) {
                    $scope.model.boundVariable = value;
                    $scope.boundVariable = value;

                    updateOptionsVisibility();

                    // Hide the dropdown after an option is selected.
                    $scope.model.isHidden = true;

                    $scope.onOptionSelected({ value: value });
                }

                function textChanged() {
                    $scope.boundVariable = $scope.model.boundVariable;

                    $scope.model.isHidden = false;

                    updateOptionsVisibility();

                    $scope.onTextChanged({ value: $scope.boundVariable });
                }

                function keydown(event) {
                    var keyCode = event.which || event.keyCode;

                    switch (keyCode) {
                        // Up arrow.
                        case 38:
                            highlightPreviousVisibleOption();
                            break;
                        // Down arrow.
                        case 40:
                            highlightNextVisibleOption();
                            break;
                        // Enter.
                        case 13:
                            if ($scope.isArrayOfPrimitives) {
                                optionSelected($scope.optionsArray[$scope.model.highlightedOptionIndex]);
                            } else {
                                optionSelected($scope.optionsArray[$scope.model.highlightedOptionIndex][$scope.propertyName]);
                            }
                            console.log('enter pressed');
                            break;
                    }
                }

                // private
                function updateOptionsVisibility() {
                    if ($scope.isArrayOfPrimitives) {
                        setPrimitiveOptionsVisibility();
                    } else {
                        setObjectOptionsVisibility();
                    }
                }

                function setObjectOptionsVisibility() {
                    for (var i = 0; i < $scope.optionsArray.length; ++i) {
                        $scope.model.visibleOptions[i] = shouldShow($scope.optionsArray[i][$scope.propertyName]);
                    }

                    highlightFirstVisibleOption();
                }

                function setPrimitiveOptionsVisibility() {
                    for (var i = 0; i < $scope.optionsArray.length; ++i) {
                        $scope.model.visibleOptions[i] = shouldShow($scope.optionsArray[i]);
                    }

                    highlightFirstVisibleOption();
                }

                function highlightFirstVisibleOption() {
                    for (var i = 0; i < $scope.optionsArray.length; ++i) {
                        if ($scope.model.visibleOptions[i]) {
                            $scope.model.highlightedOptionIndex = i;
                            break;
                        }
                    }
                }

                function highlightNextVisibleOption() {
                    var counter = ($scope.model.highlightedOptionIndex + 1) % $scope.optionsArray.length;

                    while (counter !== $scope.model.highlightedOptionIndex) {
                        if ($scope.model.visibleOptions[counter]) {
                            $scope.model.highlightedOptionIndex = counter;
                            bringInSight();
                            break;
                        }
                        counter = (counter + 1) % $scope.optionsArray.length;
                    }
                }

                function highlightPreviousVisibleOption() {
                    var counter = $scope.model.highlightedOptionIndex - 1;

                    if (counter < 0) {
                        counter = $scope.optionsArray.length - 1;
                    }

                    while (counter !== $scope.model.highlightedOptionIndex) {
                        if ($scope.model.visibleOptions[counter]) {
                            $scope.model.highlightedOptionIndex = counter;
                            bringInSight();
                            break;
                        }

                        if (counter === 0) {
                            counter = $scope.optionsArray.length;
                        }

                        counter--;
                    }
                }

                function shouldShow(optionText) {
                    var index = optionText.toLowerCase().indexOf($scope.model.boundVariable.toLowerCase());

                    return index !== -1 ? true : false;
                }

                function bringInSight() {
                    initializeHeights();

                    var highlightedVisibleOptionIndex = getHighlightedVisibleOptionIndex();

                    if (highlightedVisibleOptionIndex * optionHeight < scrollTop) {
                        $scope.element[0].children[0].children[2].scrollTop = highlightedVisibleOptionIndex * optionHeight;
                    }

                    if (highlightedVisibleOptionIndex * optionHeight >= (scrollTop + optionsHeight)) {
                        $scope.element[0].children[0].children[2].scrollTop = highlightedVisibleOptionIndex * optionHeight - optionsHeight + optionHeight;
                    }
                }

                function initializeHeights() {
                    // Get the height of an individual option.
                    if (!optionHeight) {
                        optionHeight = $scope.element[0].children[0].children[2].children[0].clientHeight;
                    }

                    // Get the height of the dropdown list.
                    optionsHeight = $scope.element[0].children[0].children[2].clientHeight;

                    // Get the position of the scrollbar.                        
                    scrollTop = $scope.element[0].children[0].children[2].scrollTop;
                }

                function getHighlightedVisibleOptionIndex() {
                    var visibleOptionIndex = 0;

                    for (var i = 0; i < $scope.model.visibleOptions.length; ++i) {
                        if ($scope.model.visibleOptions[i]) {
                            if (i === $scope.model.highlightedOptionIndex) {
                                return visibleOptionIndex;
                            }
                            ++visibleOptionIndex;
                        }
                    }
                }
            }]
        };
    });
})();