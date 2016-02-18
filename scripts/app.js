+ function () {
    /* global angular */
    /* global escape */
    'use strict'; // jshint ignore:line

    angular.isUndefined = function (value) {
        return (typeof value === 'undefined' || value === null);
    };

    angular.isDefined = function (value) {
        return !angular.isUndefined(value);
    };

    angular
        .module('app', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.router',
        'controllers',
        'services',
        'directives',
        'pascalprecht.translate',
        'filters'
    ])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$translateProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

                $urlRouterProvider.otherwise('/home');

                $translateProvider.translations('en', { // en anglais
                    brand: 'ArtWorks',
                    heading: 'Works dashboard',
                    home: 'Home',
                    menuAddWork: 'Add a work',
                    menuAddOwner: 'Add a owner',
                    menuConfirm: 'Confirm a reservation',
                    menuConsultWorks: 'Consult works',
                    menuConsultOwners: 'Consult owners',
                    menuLogout: 'Log out',
                    list: 'List',
                    add: 'Add',
                    language: 'Language',
                    french: 'French',
                    english: 'English',
                    connection: 'Connection',
                    login: 'Login',
                    logout: 'Logout',
                    worksList: 'Works list',
                    ownersList: 'Owners list',
                    filter: 'Filtered with',
                    title: 'Title',
                    owner: 'Owner',
                    ownerLastname: 'Owner name',
                    ownerFirstname: 'Owner firstname',
                    price: 'Price',
                    book: 'Book',
                    bookingDate: 'Booking date',
                    work: 'Work',
                    member: 'Member',
                    update: 'Update',
                    delete: 'Delete',
                    confirm: 'Deleting confirmed ?',
                    department: 'Department',
                    validate: 'Validate',
                    cancel: 'Cancel',
                    aWork: 'a Work',
                    aOwner: 'a Owner',
                    updating: 'Updating',
                    adding: 'Adding',
                    errorForm: 'Form with errors !',
                    msgLogin: 'Strike your login here',
                    msgPassword: 'Strike your password here',
                    password: 'Password',
                    signInError: 'Wrong login or wrong password !',
                    selectMember: 'Select a member',
                    selectWork: 'Select a work',
                    bookingList: 'Bookings list',
                    date: 'Date',
                    confirmlbl: 'Confirm'
                });

                $translateProvider.translations('fr', { // en français
                    brand: 'Oeuvres',
                    heading: 'Gestion des oeuvres',
                    home: 'Accueil',
                    menuAddWork: 'Ajouter une oeuvre',
                    menuAddOwner: 'Ajouter un propriétaire',
                    menuConfirm: 'Confirmer une réservation',
                    menuConsultWorks: 'Consulter les oeuvres',
                    menuConsultOwners: 'Consulter les propriétaires',
                    list: 'Lister',
                    add: 'Ajouter',
                    language: 'Langue',
                    french: 'Français',
                    english: 'Anglais',
                    connection: 'Connexion',
                    login: 'Se connecter',
                    logout: 'Se déconnecter',
                    worksList: 'Liste des oeuvres',
                    ownersList: 'Liste des propriétaires',
                    filter: 'Filtré avec',
                    title: 'Titre',
                    owner: 'Propriétaire',
                    ownerLastname: 'Nom du propriétaire',
                    ownerFirstname: 'Prénom du propriétaire',
                    price: 'Prix',
                    book: 'Réserver',
                    bookingDate: 'Date de réservation',
                    work: 'Oeuvre',
                    member: 'Adhérent',
                    update: 'Modification',
                    delete: 'Supression',
                    confirm: 'Suppression confirmée ?',
                    validate: 'Valider',
                    cancel: 'Annuler',
                    aWork: ' une Oeuvre',
                    aOwner: 'un propriétaire',
                    updating: 'Mettre à jour',
                    adding: 'Ajouter',
                    errorForm: 'Erreurs de saisie !',
                    msgLogin: 'Saisissez votre identifiant',
                    msgPassword: 'Saisissez votre mot de passe',
                    password: 'Mot de passe',
                    signInError: 'Login ou mot de passe erroné !',
                    selectMember: 'Sélectionner un adhérent',
                    selectWork: 'Sélectionner une oeuvre',
                    bookingList: 'Liste des réservations',
                    date: 'Date',
                    confirmlbl: 'Confirmer'
                });

                $translateProvider.preferredLanguage('en'); // Langue par défaut
                $translateProvider.useSanitizeValueStrategy('escape'); // Pour ne pas avoir de warning

                // routes
                $stateProvider
                    .state('home', {
                        url: '/home',
                        templateUrl: 'partials/home.html',
                        controller: 'MainCtrl as vm'
                    });

                $stateProvider
                    .state('connect', {
                        url: '/connect',
                        templateUrl: 'partials/connect.html',
                        controller: 'ConnectionCtrl as vm'
                    });

                $stateProvider
                    .state('getWorks', {
                        url: '/getWorks',
                        templateUrl: 'partials/works.html',
                        controller: 'WorksCtrl as vm'
                    });

                $stateProvider
                    .state('getOwners', {
                        url: '/getOwners',
                        templateUrl: 'partials/owners.html',
                        controller: 'OwnersCtrl as vm',
                        resolve: {}
                    });

                $stateProvider
                    .state('updateWork', {
                        url: '/getWork/:id',
                        params: {
                            id: null
                        },
                        templateUrl: 'partials/work.html',
                        controller: 'WorkCtrl as vm',
                        resolve: {
                            owners: function(WorksRest) {
                                return WorksRest.getOwners();
                            }
                        }
                    });

                $stateProvider
                    .state('updateOwner', {
                        url: '/getOwner/:id',
                        params: {
                            id: null
                        },
                        templateUrl: 'partials/owner.html',
                        controller: 'OwnerCtrl as vm',
                        resolve: {}
                    });

                $stateProvider
                    .state('addWork', {
                        url: '/addWork',
                        params: {
                            id: null
                        },
                        templateUrl: 'partials/work.html',
                        controller: 'WorkCtrl as vm',
                        resolve: {
                            owners: function(WorksRest) {
                                return WorksRest.getOwners();
                            }
                        }
                    });

                $stateProvider
                    .state('addOwner', {
                        url: '/addOwner',
                        params: {
                            id: null
                        },
                        templateUrl: 'partials/owner.html',
                        controller: 'OwnerCtrl as vm',
                        resolve: {}
                    });

                $stateProvider
                    .state('bookWork', {
                        url: '/bookWork/:id',
                        params: {
                            id: null
                        },
                        templateUrl: 'partials/booking.html',
                        controller: 'BookingCtrl as vm',
                        resolve: {}
                    });

                $stateProvider
                    .state('getBookings', {
                        url: '/getBookings',
                        params: {
                            id: null
                        },
                        templateUrl: 'partials/bookings.html',
                        controller: 'BookingsCtrl as vm',
                        resolve: {}
                    });
    }])
        .run(['$http', '$location', '$rootScope', '$state',
    function ($http, $location, $rootScope, $state) {
        // defaults
        $rootScope.openedStates = ['connect', 'home'];
        $rootScope.isConnected = false;
        $rootScope.language = 'en';
        
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
            if($rootScope.openedStates.indexOf(toState.name) === -1 && $rootScope.isConnected === false) {
                event.preventDefault();
                $state.go('connect');
            }
        });
    }]);
}();