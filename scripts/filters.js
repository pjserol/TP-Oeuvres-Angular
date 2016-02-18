!function() {
    /* global angular */
    'use strict'; // jshint ignore:line
    
    function currency($rootScope, $translate) {            
        return function(number) {
            var separator = ' ';
            var decimalPoint = ',';
            var money = ' €';
            
            if($translate.use() === 'en') {
                separator = ',';
                decimalPoint = '.';
                money = ' $';
            }
            
            var parts = number.toString().split('.');
            return parts[0].replace(/\B(?=(\d{3})+(?=$))/g, separator) + (parts[1] ? decimalPoint + parts[1] : '') + money;
        }
    }
    
    currency.$inject = ['$rootScope', '$translate'];
    
    angular.module('filters', [])
    .filter('currency', currency)
}();
