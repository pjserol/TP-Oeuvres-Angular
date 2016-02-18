! function () {
    /* global angular */
    'use strict'; // jshint ignore:line

    function MainCtrl(
        $rootScope,
        localization,
        $state,
        $translate
    ) {
        var disconnect = function () {
            $rootScope.isConnected = false;
            $state.go('home');
        }

        var setLang = function (lang) {
            localization.setLang(lang);
            $translate.use(lang);
        }

        // exports
        angular.extend(this, {
            disconnect: disconnect,
            isConnected: function () {
                return $rootScope.isConnected;
            },
            setLang: setLang
        });
    }

    function ConnectionCtrl(
        $rootScope,
        Connection,
        $state,
        $filter
    ) {
        var vm = this;
        var credentials = {
            login: '',
            pwd: '',
        }

        var error = '';

        var signIn = function () {
            Connection.getConnection(credentials.login, credentials.pwd)
                .then(function (response) {
                    if (response.statusText === 'OK') {
                        $rootScope.isConnected = true;
                    }

                    if ($rootScope.isConnected) {
                        $state.go('home');
                    } else {
                        vm.error = $filter('translate')('signInError');
                    }

                });
        }

        // exports
        angular.extend(this, {
            signIn: signIn,
            credentials: credentials
        });
    }

    function WorksCtrl(
        WorksRest,
        $state
    ) {
        var vm = this;

        var worksPromise = WorksRest.getWorks();
        var works = [];

        worksPromise.success(function (data) {
            if (data.length > 0) {
                vm.works = data;
            }
        }).error(function (error) {
            vm.error = error;
        });

        var deleteWork = function (id) {
            if (id) {
                WorksRest.deleteWork(id).success(function (data, status) {
                    if (status === 200) {
                        //$state.go('getEmployees');
                        $state.reload();
                    }
                }).error(function (error) {
                    vm.error = error;
                });
            }
        }

        // exports
        angular.extend(this, {
            works: works,
            deleteWork: deleteWork
        });
    }

    function WorkCtrl(
        WorksRest,
        $stateParams,
        $state,
        $filter,
        $rootScope,
        owners
    ) {
        var vm = this;

        vm.workId = $stateParams.id;
        
        // set owners (injected from app)
        if(typeof owners !== 'undefined') {
            vm.owners = owners.data;
        }
            
        var validateWork = function (id, form) {
            if (form.$valid) {
                var work = vm.work;

                var regexp = /^\d+\,\d{0,2}$/;
                if (regexp.test(vm.work.prix)) {
                    work.prix = vm.work.prix.replace(',', '.');
                }

                work.proprietaire = vm.selectedOptionOwner;

                // to float
                work.prix = parseFloat(work.prix);
                delete work.id_proprietaire;

                if (id) {
                    WorksRest.updateWork(work).success(function (data, status) {
                        if (status === 200) {
                            $state.go('getWorks');
                        }
                    }).error(function (error) {
                        vm.error = error;
                    });
                } else {
                    work.id_oeuvre = 0;
                    WorksRest.addWork(work).success(function (data, status) {
                        if (status === 200) {
                            $state.go('getWorks');
                        }
                    }).error(function (error) {
                        vm.error = error;
                    });
                }
            } else {
                vm.error = $filter('translate')('errorForm');
            }
        }

        var cancel = function () {
            $state.go('home');
        }

        updateTitle();
        $rootScope.$watch('language', function () {
            updateTitle();
        });

        function updateTitle() {
            vm.pageTitle = $filter('translate')('aWork');
            if (vm.workId) {
                vm.pageTitle = $filter('translate')('updating') + ' ' + vm.pageTitle;
            } else {
                vm.pageTitle = $filter('translate')('adding') + ' ' + vm.pageTitle;
            }
        }

        if (vm.workId) {
            var workR = WorksRest.getWork($stateParams.id);

            workR.success(function (data, status) {
                if (status == 200) {
                    vm.work = data;
                    vm.selectedOptionOwner = vm.work.proprietaire;
                }
            }).error(function (error) {
                vm.error = $filter('translate')('errorForm');
                console.log(vm.error);
            });
        }

        // exports
        angular.extend(this, {
            validateWork: validateWork,
            cancel: cancel
        });
    }

    function OwnersCtrl(
        WorksRest,
        $state
    ) {
        var vm = this;

        var ownersPromise = WorksRest.getOwners();
        var owners = [];

        ownersPromise.success(function (data) {
            if (data.length > 0) {
                vm.owners = data;
            }
        }).error(function (error) {
            vm.error = error;
            console.log(vm.error);
        });

        // exports
        angular.extend(this, {
            owners: owners
        });
    }

    function OwnerCtrl(
        WorksRest,
        $stateParams,
        $state,
        $filter,
        $rootScope
    ) {
        var vm = this;

        vm.ownerId = $stateParams.id;

        var validateOwner = function (id, form) {
            if (form.$valid) {
                var owner = vm.owner;

                if (id) {
                    WorksRest.updateOwner(owner).success(function (data, status) {
                        if (status === 200) {
                            $state.go('getOwners');
                        }
                    }).error(function (error) {
                        vm.error = error;
                        console.log(vm.error);
                    });
                } else {
                    owner.id_proprietaire = 0;
                    WorksRest.addOwner(owner).success(function (data, status) {
                        console.log(owner);
                        if (status === 200) {
                            $state.go('getOwners');
                        }
                    }).error(function (error) {
                        vm.error = error;
                        console.log(vm.error);
                    });
                }
            } else {
                vm.error = $filter('translate')('errorForm');
            }
        }

        var cancel = function () {
            $state.go('getOwners');
        }

        updateTitle();
        $rootScope.$watch('language', function () {
            updateTitle();
        });

        function updateTitle() {
            vm.pageTitle = $filter('translate')('aOwner');
            if (vm.ownerId) {
                vm.pageTitle = $filter('translate')('updating') + ' ' + vm.pageTitle;
            } else {
                vm.pageTitle = $filter('translate')('adding') + ' ' + vm.pageTitle;
            }
        }

        if (vm.ownerId) {
            WorksRest.getOwners().success(function (data) {

                for (var index in data) {
                    var aOwner = data[index];
                    if(aOwner.id_proprietaire == vm.ownerId) {
                        var idOwner = index;
                    }
                }
                vm.owner = data[idOwner];
            });
        }


        // exports
        angular.extend(this, {
            validateOwner: validateOwner,
            cancel: cancel
        });
    }

    function BookingCtrl(
        WorksRest,
        $stateParams,
        $state,
        $filter,
        $rootScope
    ) {
        var vm = this;

        vm.workId = $stateParams.id;
        vm.datePickerOpened = false;

        WorksRest.getWork(vm.workId).success(function (data) {
            // init
            vm.selectedOptionWork = data;
        });

        WorksRest.getMembers().success(function (data) {
            vm.members = data;
            // init
            vm.selectedOptionMember = data[0];
        });

        var validateBooking = function (form) {
            if (form.$valid) {
                var booking = vm.booking;

                booking.id_oeuvre = vm.selectedOptionWork.id_oeuvre;
                booking.id_adherent = vm.selectedOptionMember.id_adherent;
                booking.date_reservation = $filter('date')(vm.booking.date_reservation, 'yyyy-MM-dd');

                var regexp = /^\d+\,\d{0,2}$/;
                WorksRest.bookWork(booking).success(function (data, status) {
                    if (status === 200) {
                        $state.go('getWorks');
                    }
                }).error(function (error) {
                    vm.error = error;
                });
            } else {
                vm.error = $filter('translate')('errorForm');
            }
        }

        var cancel = function () {
            $state.go('getWorks');
        }

        var openDatePicker = function () {
            vm.datePickerOpened = true;
        }

        updateTitle();
        $rootScope.$watch('language', function () {
            updateTitle();
        });

        function updateTitle() {
            vm.pageTitle = $filter('translate')('aWork');
            vm.pageTitle = $filter('translate')('book') + ' ' + vm.pageTitle;
        }

        // exports
        angular.extend(this, {
            validateBooking: validateBooking,
            openDatePicker: openDatePicker,
            cancel: cancel
        });
    }

    function BookingsCtrl(
        WorksRest,
        $stateParams,
        $state,
        $filter,
        $rootScope
    ) {
        var vm = this;

        var bookingsPromise = WorksRest.getWorkBookings();
        var bookings = [];

        bookingsPromise.success(function (data) {
            if (data.length > 0) {
                vm.bookings = data;
            }
        }).error(function (error) {
            vm.error = error;
        });

        var confirmBooking = function (id, date) {
            if (id) {
                date = $filter('date')(date, 'yyyy-MM-dd');
                WorksRest.confirmWorkBooking(id, date).then(function (data, status) {
                    if (data.status == 200) {
                        $state.reload();
                    }
                }).catch(function (error) {
                    vm.error = error;
                });
            }
        }

        var deleteBooking = function (id, date) {
            if (id) {
                date = $filter('date')(date, 'yyyy-MM-dd');
                WorksRest.deleteWorkBooking(id, date).then(function (data, status) {
                    console.log(data);
                    if (data.status == 200) {
                        $state.reload();
                    }
                }).catch(function (error) {
                    vm.error = error;
                });
            }
        }

        var isConfirmed = function (statut) {
            return statut === 'Confirmée';
        }

        // exports
        angular.extend(this, {
            bookings: bookings,
            confirmBooking: confirmBooking,
            deleteBooking: deleteBooking,
            isConfirmed: isConfirmed
        });
    }

    MainCtrl.$inject = [
        '$rootScope',
        'localization',
        '$state',
        '$translate'
    ];

    ConnectionCtrl.$inject = [
        '$rootScope',
        'Connection',
        '$state',
        '$filter'
    ];

    WorksCtrl.$inject = [
        'WorksRest',
        '$state'
    ];

    WorkCtrl.$inject = [
        'WorksRest',
        '$stateParams',
        '$state',
        '$filter',
        '$rootScope',
        'owners'
    ];

    OwnersCtrl.$inject = [
        'WorksRest',
        '$state'
    ];

    OwnerCtrl.$inject = [
        'WorksRest',
        '$stateParams',
        '$state',
        '$filter',
        '$rootScope'
    ];

    BookingCtrl.$inject = [
        'WorksRest',
        '$stateParams',
        '$state',
        '$filter',
        '$rootScope'
    ];

    BookingsCtrl.$inject = [
        'WorksRest',
        '$stateParams',
        '$state',
        '$filter',
        '$rootScope'
    ];

    angular.module('controllers', ['services', 'filters'])
        .controller('MainCtrl', MainCtrl)
        .controller('ConnectionCtrl', ConnectionCtrl)
        .controller('WorksCtrl', WorksCtrl)
        .controller('WorkCtrl', WorkCtrl)
        .controller('OwnersCtrl', OwnersCtrl)
        .controller('OwnerCtrl', OwnerCtrl)
        .controller('BookingsCtrl', BookingsCtrl)
        .controller('BookingCtrl', BookingCtrl)
}();