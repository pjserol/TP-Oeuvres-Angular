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

        localization.setLang('en');
        $translate.use('en');

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
                    console.log(response);
                    if (response.statusText === 'OK') {
                        $rootScope.isConnected = true;
                    }

                    if ($rootScope.isConnected) {
                        console.log($rootScope.isConnected);
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
            console.log(vm.error);
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
        $rootScope
    ) {
        var vm = this;

        vm.workId = $stateParams.id;

        WorksRest.getOwners().success(function (data) {
            vm.owners = data;
        });

        var validateWork = function (id, form) {
            if (form.$valid) {
                var work = vm.work;

                work.proprietaire = vm.selectedOptionOwner;

                var regexp = /^\d+\,\d{0,2}$/;
                if (regexp.test(vm.work.prix)) {
                    work.prix = vm.work.prix.replace(',', '.');
                }

                work.prix = work.prix.toString();

                if (id) {
                    WorksRest.updateWork(id, work).success(function (data, status) {
                        if (status === 200) {
                            $state.go('getWorks');
                        }
                    }).error(function (error) {
                        vm.error = error;
                        console.log(vm.error);
                    });
                } else {
                    WorksRest.addWork(work).success(function (data, status) {
                        if (status === 200) {
                            $state.go('getWorks');
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
            $state.go('getWorks');
        }

        updateTitle();
        $rootScope.$watch('language', function () {
            updateTitle();
        });

        function updateTitle() {
            vm.pageTitle = $filter('translate')('aWork');
            if (vm.employeeId) {
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

    function OwnerCtrl(
        WorksRest,
        $stateParams,
        $state,
        $filter,
        $rootScope
    ) {
        var vm = this;

        vm.ownerId = $stateParams.id;

        /*WorksRest.getOwners().success(function(data) {
            vm.owners = data;
        });*/

        var validateWork = function (id, form) {
            if (form.$valid) {
                var owner = vm.owner;

                /*work.proprietaire = vm.selectedOptionOwner;*/

                /*var regexp = /^\d+\,\d{0,2}$/;
                if (regexp.test(vm.work.prix)) {
                    work.prix = vm.work.prix.replace(',', '.');
                }*/

                /*work.prix = work.prix.toString();*/

                if (id) {
                    WorksRest.updateOwner(id, owner).success(function (data, status) {
                        if (status === 200) {
                            $state.go('getWorks');
                        }
                    }).error(function (error) {
                        vm.error = error;
                        console.log(vm.error);
                    });
                } else {
                    WorksRest.addOwner(owner).success(function (data, status) {
                        if (status === 200) {
                            $state.go('getWorks');
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
            $state.go('getWorks');
        }

        updateTitle();
        $rootScope.$watch('language', function () {
            updateTitle();
        });

        function updateTitle() {
            vm.pageTitle = $filter('translate')('aOwner');
            if (vm.employeeId) {
                vm.pageTitle = $filter('translate')('updating') + ' ' + vm.pageTitle;
            } else {
                vm.pageTitle = $filter('translate')('adding') + ' ' + vm.pageTitle;
            }
        }

        /*if (vm.workId) {
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
        }*/

        // exports
        angular.extend(this, {
            validateWork: validateWork,
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

        WorksRest.getWorks().success(function (data) {
            vm.works = data;
            // init
            vm.selectedOptionWork = data[0];
        });

        WorksRest.getMembers().success(function (data) {
            vm.members = data;
            // init
            vm.selectedOptionMember = data[0];
        });

        var validateBooking = function (form) {
            if (form.$valid) {
                var booking = vm.booking;

                booking.workId = vm.selectedOptionWork.id_oeuvre;
                booking.memberId = vm.selectedOptionMember.id_adherent;
                booking.date = $filter('date')(vm.booking.bookingDate, 'dd/MM/yyyy');

                var regexp = /^\d+\,\d{0,2}$/;
                WorksRest.bookWork(booking).success(function (data, status) {
                    if (status === 200) {
                        $state.go('getWorks');
                    }
                }).error(function (error) {
                    vm.error = error;
                    console.log(vm.error);
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
                console.log(data);
            }
        }).error(function (error) {
            vm.error = error;
            console.log(vm.error);
        });

        var confirmBooking = function (id, date) {
            if (id) {
                date = $filter('date')(date, 'dd-MM-yyyy');
                WorksRest.confirmWorkBooking(id, date).then(function (data, status) {
                    console.log(data);
                    if (status == 200) {
                        $state.reload();
                    }
                }).catch(function (error) {
                    vm.error = error;
                    console.log(vm.error);
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
        '$rootScope'
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

    angular.module('controllers', ['services'])
        .controller('MainCtrl', MainCtrl)
        .controller('ConnectionCtrl', ConnectionCtrl)
        .controller('WorksCtrl', WorksCtrl)
        .controller('WorkCtrl', WorkCtrl)
        .controller('OwnerCtrl', OwnerCtrl)
        .controller('BookingsCtrl', BookingsCtrl)
        .controller('BookingCtrl', BookingCtrl)
}();