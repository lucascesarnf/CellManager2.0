angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.reuniEs', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/reuniEs.html',
        controller: 'reuniEsCtrl'
      }
    }
  })

  .state('tabsController.membros', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/membros.html',
        controller: 'membrosCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('conta', {
    url: '/page6',
    templateUrl: 'templates/conta.html',
    controller: 'contaCtrl'
  })

  .state('informaEs', {
    url: '/page7',
    templateUrl: 'templates/informaEs.html',
    controller: 'informaEsCtrl'
  })

$urlRouterProvider.otherwise('/page5')

  

});