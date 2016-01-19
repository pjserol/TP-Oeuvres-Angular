!function() {
    /* global angular */
    'use strict'; // jshint ignore:line
    
    function ngConfirmBoxClick() {            
       return {
            link: function(scope, element, attribute) {
                var msg = attribute.ngConfirmBoxClick;
                var clickAction = attribute.confirmedClick;
                element.bind('click', function(event) {
                    if(window.confirm(msg)) {
                        scope.$eval(clickAction);
                    }
                }); 
            }
       }         
    }
    

    angular.module('directives', [])
    .directive('ngConfirmBoxClick', ngConfirmBoxClick)
}();
