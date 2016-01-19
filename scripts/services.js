!function() {
    /* global angular */
    'use strict'; // jshint ignore:line
    
    function Connection(
        $rootScope,
         Config,
         $http
        ) {
            
            var getConnection = function(login, pwd) {
                var ok = false;
                
                var url = Config.serverUrl + Config.getLogInUrl + login + '-' + pwd;
                return $http.get(url);
            }
            
            var exports = {
                getConnection: getConnection
            };
            
            return exports;
        }
    
    function Config() {
        return {
            serverUrl: 'http://debian-srv.univ-lyon1.fr:8080/OeuvresRest/webresources/webservices',
            getLogInUrl: '/getConnecter/',
            getWorksUrl: '/getOeuvres',
            getWorkUrl: '/getOeuvre/',
            getAddWorkUrl: '/ajouterOeuvre',
            getUpdateWorkUrl: '/modifierOeuvre',
            getBookWorkUrl: '/ajouterReservation',
            getConfirmWorkBookingUrl: '',
            getOwnersUrl: '/getProprietaires',
            getMembersUrl: '/getAdherents',
        };
    }
    
    function WorksRest(
        $http, 
        Config
        ) {
            var getWorks = function() {
                var url = Config.serverUrl + Config.getWorksUrl;
                return $http.get(url);
            }
            
            var getWork = function(id) {
                var url = Config.serverUrl + Config.getWorkUrl + id;
                return $http.get(url);
            }
            
            var getMembers = function() {
                var url = Config.serverUrl + Config.getMembersUrl;
                return $http.get(url);
            }
            
            var addWork = function(work) {
                var url = Config.serverUrl + Config.getAddWorkUrl;
                return $http.post(url, work);
            }
            
            var updateWork = function(work) {
                var url = Config.serverUrl + Config.getUpdateWorkUrl;
                return $http.post(url, work);
            }
            
            var getOwners = function() {
                var url = Config.serverUrl + Config.getOwnersUrl;
                return $http.get(url);
            }
            
            var bookWork = function() {
                var url = Config.serverUrl + Config.getBookWorkUrl;
                return $http.post(url);
            }
            
            var confirmWorkBooking = function() {
                var url = Config.serverUrl + Config.getConfirmWorkBookingUrl;
                return $http.get(url);
            }
            
            var exports = {
                getWorks: getWorks,
                getWork: getWork,
                getMembers: getMembers,
                addWork: addWork,
                updateWork: updateWork,
                getOwners: getOwners,
                bookWork: bookWork,
                confirmWorkBooking: confirmWorkBooking
            };

            return exports;
    }
    
    function localization($locale, $rootScope) {
            function setLang(lang) {
                var PLURAL_CATEGORY = {
                    ZERO: "zero",
                    ONE: "one",
                    TWO: "two",
                    FEW: "few",
                    MANY: "many",
                    OTHER: "other"
                };

                function getDecimals(n) {
                    n = n + '';
                    var i = n.indexOf('.');
                    return (i == -1) ? 0 : n.length - i - 1;
                }

                function getVF(n, opt_precision) {
                    var v = opt_precision;

                    if (undefined === v) {
                        v = Math.min(getDecimals(n), 3);
                    }

                    var base = Math.pow(10, v);
                    var f = ((n * base) | 0) % base;
                    return {
                        v: v,
                        f: f
                    };
                }
                var locales = {
                    fr: {
                        "DATETIME_FORMATS": {
                            "AMPMS": [
                        "AM",
                        "PM"
                    ],
                            "DAY": [
                        "dimanche",
                        "lundi",
                        "mardi",
                        "mercredi",
                        "jeudi",
                        "vendredi",
                        "samedi"
                    ],
                            "ERANAMES": [
                        "avant J\u00e9sus-Christ",
                        "apr\u00e8s J\u00e9sus-Christ"
                    ],
                            "ERAS": [
                        "av. J.-C.",
                        "ap. J.-C."
                    ],
                            "FIRSTDAYOFWEEK": 0,
                            "MONTH": [
                        "janvier",
                        "f\u00e9vrier",
                        "mars",
                        "avril",
                        "mai",
                        "juin",
                        "juillet",
                        "ao\u00fbt",
                        "septembre",
                        "octobre",
                        "novembre",
                        "d\u00e9cembre"
                    ],
                            "SHORTDAY": [
                        "dim.",
                        "lun.",
                        "mar.",
                        "mer.",
                        "jeu.",
                        "ven.",
                        "sam."
                    ],
                            "SHORTMONTH": [
                        "janv.",
                        "f\u00e9vr.",
                        "mars",
                        "avr.",
                        "mai",
                        "juin",
                        "juil.",
                        "ao\u00fbt",
                        "sept.",
                        "oct.",
                        "nov.",
                        "d\u00e9c."
                    ],
                            "WEEKENDRANGE": [
                        5,
                        6
                    ],
                            "fullDate": "EEEE d MMMM y",
                            "longDate": "d MMMM y",
                            "medium": "d MMM y HH:mm:ss",
                            "mediumDate": "d MMM y",
                            "mediumTime": "HH:mm:ss",
                            "short": "dd/MM/y HH:mm",
                            "shortDate": "dd/MM/yyyy",
                            "shortTime": "HH:mm"
                        },
                        "NUMBER_FORMATS": {
                            "CURRENCY_SYM": "\u20ac",
                            "DECIMAL_SEP": ",",
                            "GROUP_SEP": "\u00a0",
                            "PATTERNS": [
                                {
                                    "gSize": 3,
                                    "lgSize": 3,
                                    "maxFrac": 3,
                                    "minFrac": 0,
                                    "minInt": 1,
                                    "negPre": "-",
                                    "negSuf": "",
                                    "posPre": "",
                                    "posSuf": ""
                        },
                                {
                                    "gSize": 3,
                                    "lgSize": 3,
                                    "maxFrac": 2,
                                    "minFrac": 2,
                                    "minInt": 1,
                                    "negPre": "-",
                                    "negSuf": "\u00a0\u00a4",
                                    "posPre": "",
                                    "posSuf": "\u00a0\u00a4"
                        }
                    ]
                        },
                        "id": "fr-fr",
                        "pluralCat": function (n, opt_precision) {
                            var i = n | 0;
                            if (i == 0 || i == 1) {
                                return PLURAL_CATEGORY.ONE;
                            }
                            return PLURAL_CATEGORY.OTHER;
                        }
                    },
                    en: {
                        "DATETIME_FORMATS": {
                            "AMPMS": [
                        "AM",
                        "PM"
                    ],
                            "DAY": [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ],
                            "ERANAMES": [
                        "Before Christ",
                        "Anno Domini"
                    ],
                            "ERAS": [
                        "BC",
                        "AD"
                    ],
                            "FIRSTDAYOFWEEK": 0,
                            "MONTH": [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ],
                            "SHORTDAY": [
                        "Sun",
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat"
                    ],
                            "SHORTMONTH": [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ],
                            "WEEKENDRANGE": [
                        5,
                        6
                    ],
                            "fullDate": "EEEE, y MMMM dd",
                            "longDate": "y MMMM d",
                            "medium": "y MMM d HH:mm:ss",
                            "mediumDate": "y MMM d",
                            "mediumTime": "HH:mm:ss",
                            "short": "yyyy-MM-dd HH:mm",
                            "shortDate": "yyyy-MM-dd",
                            "shortTime": "HH:mm"
                        },
                        "NUMBER_FORMATS": {
                            "CURRENCY_SYM": "$",
                            "DECIMAL_SEP": ".",
                            "GROUP_SEP": ",",
                            "PATTERNS": [
                                {
                                    "gSize": 3,
                                    "lgSize": 3,
                                    "maxFrac": 3,
                                    "minFrac": 0,
                                    "minInt": 1,
                                    "negPre": "-",
                                    "negSuf": "",
                                    "posPre": "",
                                    "posSuf": ""
                        },
                                {
                                    "gSize": 3,
                                    "lgSize": 3,
                                    "maxFrac": 2,
                                    "minFrac": 2,
                                    "minInt": 1,
                                    "negPre": "-\u00a4",
                                    "negSuf": "",
                                    "posPre": "\u00a4",
                                    "posSuf": ""
                        }
                    ]
                        },
                        "id": "en-iso",
                        "pluralCat": function (n, opt_precision) {
                            var i = n | 0;
                            var vf = getVF(n, opt_precision);
                            if (i == 1 && vf.v == 0) {
                                return PLURAL_CATEGORY.ONE;
                            }
                            return PLURAL_CATEGORY.OTHER;
                        }
                    }
                };
                // Place la langue choisie dans la variable
                // globale $locale
                angular.copy(locales[lang], $locale);
                // Place la langue choisie dans le contexte global $rootScope
                $rootScope.language = lang;
            }
        
        var exports = {
            setLang: setLang
        };

        return exports;
    }
    
    Connection.$inject = [
        '$rootScope',
        'Config',
        '$http'
    ];
    
    WorksRest.$inject = [
        '$http',
        'Config'
    ];
    
    localization.$inject = [
        '$locale',
        '$rootScope'
    ]
    
    angular.module('services', [])
    .factory('Connection', Connection)
    .factory('Config', Config)
    .factory('WorksRest', WorksRest)
    .factory('localization', localization)
}();
