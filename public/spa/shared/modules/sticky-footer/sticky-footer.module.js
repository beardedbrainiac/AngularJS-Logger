﻿(function () {
    'use strict';

    angular.module('angular-sticky-footer', [])
        .directive('ngStickyFooter', StickyFooter);

    function StickyFooter($window) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element, attrs) {
                // Get the heights
                scope.heights = function() {
                    return {
                        window: $window.innerHeight,
                        body: element[0].offsetHeight
                    };
                };

                // Set the offset. It is optional. Generally leave it blank.
                var offset = attrs.offset || 0;

                // Relocate the footer.
                var setFooter = function() {
                    if (scope.windowHeight > scope.bodyHeight + offset) {
                        scope.footer = {
                            position: 'absolute',
                            bottom: 0,
                            width: '100%'
                        };
                    } else {
                        scope.footer = {};
                    }
                };

                // Watch the heights
                scope.$watch(scope.heights,
                    function(newValue, oldValue) {
                        scope.windowHeight = newValue.window;
                        scope.bodyHeight = newValue.body;
                        setFooter();
                    },
                    true);

                // Add the listener
                angular.element($window).bind('resize',
                    function() {
                        scope.$apply();
                    });
            }
        }
    }

}());