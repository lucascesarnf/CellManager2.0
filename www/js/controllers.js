angular.module('app.controllers', [])
     
.controller('loginCtrl', ['$scope', '$stateParams','$ionicLoading','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,$state) {
$scope.login = function(user) {

	if(typeof user !== "undefined"){
	console.log(user);
	$ionicLoading.show();
	// FireBase
	firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(function(result) {
             $ionicLoading.hide();
             $state.go('tabsController.membros);
            },
            function(error) {
	           // Handle Errors here.
	          var errorCode = error.code;
	          var errorMessage = error.message;
	          $ionicLoading.hide();
	          // [START_EXCLUDE]
	          if (errorCode === 'auth/wrong-password') {
	            alert('Wrong password.');
	          }else{
	              alert(errorMessage);
	           }
	             console.log(error);
	             document.getElementById('quickstart-sign-in').disabled = false;
	            // [END_EXCLUDE]
            }
        );
    }
};
}])
   
.controller('membrosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('reunioesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('informacoesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('contaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 