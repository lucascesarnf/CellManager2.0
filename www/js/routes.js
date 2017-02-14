angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page2',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page1',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.membros', {
    url: '/page3',
    views: {
      'tab4': {
        templateUrl: 'templates/membros.html',
        controller: 'membrosCtrl'
      }
    }
  })

  .state('tabsController.reunioes', {
    url: '/page4',
    views: {
      'tab5': {
        templateUrl: 'templates/reunioes.html',
        controller: 'reunioesCtrl'
      }
    }
  })

  .state('tabsController.informacoes', {
    url: '/page5',
    views: {
      'tab6': {
        templateUrl: 'templates/informacoes.html',
        controller: 'informacoesCtrl'
      }
    }
  })

  .state('tabsController.conta', {
    url: '/page6',
    views: {
      'tab7': {
        templateUrl: 'templates/conta.html',
        controller: 'contaCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1')

  

});