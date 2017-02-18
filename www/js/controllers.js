angular.module('app.controllers', [])
     
.controller('loginCtrl', ['$scope', '$stateParams','$ionicLoading','$state','$ionicPopup','$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,$state,$ionicPopup,$ionicHistory) {
  $ionicHistory.nextViewOptions({
  disableAnimate: true,
  disableBack: true
});
$scope.login = function(user) {

	if(typeof user !== "undefined"){
	$ionicLoading.show();
	// FireBase
  if(user.email != "undefined" && user.password != "undefined" ){
	firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(function(result) {
    /*
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified,cell,church;
            
            */
             $ionicLoading.hide();
             $state.go('tabsController.membros');
            },
            function(error) {
	           // Handle Errors here.
	          var errorCode = error.code;
	          var errorMessage = error.message;
	          $ionicLoading.hide();
	          // [START_EXCLUDE]
	          if (errorCode === 'auth/wrong-password') {
	          	$ionicLoading.hide();
	          	var alertPopup = $ionicPopup.alert({
               title: 'Não foi possivel logar',
               cssClass:'popup',
              template: 'A senha digitada está incorreta'
               });
	          }else{
	          	$ionicLoading.hide();
	          	var alertPopup = $ionicPopup.alert({
               title: 'Não foi possivel logar',
               cssClass:'popup',
              template: errorMessage
               });
	           }
	             console.log(error);
	             document.getElementById('quickstart-sign-in').disabled = false;
	            // [END_EXCLUDE]
            }
        );
      }else{
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
       title: 'Digite um email e senha válidos' ,
       cssClass:'popup',
       template: 'Entre com seu usuário e senha ou cadastre-se!' 
     });
      }
    }else{
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
       title: 'Parece que você não digitou nada',
       cssClass:'popup',
       template: 'Entre com seu usuário e senha ou cadastre-se!' 
     });
    }
$ionicLoading.hide();
};
}])
   
.controller('membrosCtrl', ['$scope', '$stateParams','$ionicLoading','$state','$ionicPopup','fireBaseData','safeApply','$firebaseArray','$ionicListDelegate',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,$state,$ionicPopup,fireBaseData,safeApply,$firebaseArray,$ionicListDelegate) {
  $scope.init= function(){
  $scope.statusMembro = [];
  $scope.statusMembro["Visitante"] = "img/Visitante2.png";
  $scope.statusMembro["Novato"] = "img/Novato2.png";
  $scope.statusMembro["Veterano"] = "img/Veterano2.png";
  $scope.statusMembro["Colíder"] = "img/Colider2.png";
         //safeApply($scope); 
         safeApply($scope, function() {
         var user = firebase.auth().currentUser;
         var membros = [];
        if (user) {
           var memberRef = fireBaseData.refUser().child(user.uid).child("membros");
          $scope.items = $firebaseArray(memberRef);
          //console.log($scope.items);
          }
          });
        }
$scope.memberRefresh = function(){
safeApply($scope, function() {
         var user = firebase.auth().currentUser;
         var membros = [];
        if (user) {
           var memberRef = fireBaseData.refUser().child(user.uid).child("membros");
          $scope.items = $firebaseArray(memberRef);
          //console.log($scope.items);
          }
          });
}
$scope.doRefresh = function() {
   $scope.items = fireBaseData.getMembros(); 
   $scope.$broadcast('scroll.refreshComplete');
  };
  //***********ADD*************
    $scope.add = function() {
   $scope.data = {}
   var myPopup = $ionicPopup.show({
      template:'<label class="item item-input"><span class="input-label">Nome</span><input type="text" ng-model="data.name"></label><label class="item item-input"><span class="input-label">Telefone</span><input type="tel" ng-model="data.tel"></label><label class="item item-input"><span class="input-label">Nascimento</span><input type="date" ng-model="data.datanasc"></label><label class="item item-input"><span class="input-label">Email</span><input type="email" ng-model="data.email"></label><label class="item item-input"><span class="input-label">Endereço</span><input type="text" ng-model="data.end"></label><label class="item item-input item-select"><div class="input-label">Status</div><select name="status" ng-model="data.status"><option selected>Visitante</option><option>Novato</option><option>Veterano</option><option>Colíder</option></select></label>', 
      title: '<h3>Novo Membro</h3>',
      subTitle: '<h5>Entre com os dados:<h5>',
      scope: $scope,
      buttons: [{
         text: 'Cancel'
      }, {
         text: '<b>Save</b>',
         type: 'button-calm',
         onTap: function(e) {
            if (!$scope.data.name) {
               //don't allow the user to close unless he enters wifi password
               e.preventDefault();
            } else {
               return $scope.data;
            }
         }
      }, ]
   });
   myPopup.then(function(res) {
      if (res) {  
        if(res.status==null){
          res.status = "Visitante";
        }
        if(res.datanasc==null){
          res.datanasc = new Date();
        }
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(res.datanasc);
           var memberRef = fireBaseData.refUser().child(user.uid).child("membros");
           var newMemberRef = memberRef.push();
           newMemberRef.set({
               name:res.name,
               tel:res.tel, 
               datanasc:res.datanasc.toString(),
               email:res.email, 
               end: res.end, 
               status: res.status
            });/*
          fireBaseData.refMember(user.uid).set({
               name:res.name,
               tel:res.tel, 
               datanasc:res.datanasc,
               email:res.email, 
               end: res.end, 
               status: res.status
            });*/
        // User is signed in.
         $scope.memberRefresh();
         } else {
           $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
           title: 'Você não está logado' ,
           cssClass:'popup',
           template: 'Aí não dá nê' 
           });
        // No user is signed in.
         }
});
        //$scope.items.push({name:res.name, tel:res.tel, datanasc:res.datanasc,email:res.email, end: res.end, status: res.status});
        //Persistencia.salvar('Membros',$scope.items);        
        //$scope.items = Persistencia.all('Membros');
      } 
   });
};

    //************FIM ADD*********** 
    //***********EDIT***************
    $scope.close = function(){
     $ionicListDelegate.closeOptionButtons();
    };
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
.controller('signUpCtrl', ['$scope', '$stateParams','$ionicLoading','$state','$ionicPopup','$ionicHistory','fireBaseData', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,$state,$ionicPopup,$ionicHistory,fireBaseData) {
	$scope.inputType = 'password';
	//Password hidden
$scope.hideShowPassword = function(){
    if ($scope.inputType == 'password')
      $scope.inputType = 'text';
    else
      $scope.inputType = 'password';
  };
  //Sing Up
   $scope.signupEmail = function (formName, cred) {
 
      if (formName.$valid) {  // Check if the form data is valid or not
         if(typeof cred !== "undefined"){
        $ionicLoading.show();
 
        //Main Firebase Authentication part
        firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {
            
            result.updateProfile({
              displayName: cred.name,
              photoURL: "default_dp"
            }).then(function() {}, function(error) {});
            
			
			//We create a user table to store users additional information.Here, telephone
            //Add phone number to the user table
            fireBaseData.refUser().child(result.uid).set({
              name: cred.name,
              cell:cred.cell,
              church: cred.church
            });/*
            fireBaseData.refUser.child(result.uid).set({
              name:cred.name,
              cell:cred.cell,
              church: cred.church
            });*/
 
            //Registered OK
            $ionicHistory.nextViewOptions({
              historyRoot: true
            });
            $ionicLoading.hide();
             $state.go('tabsController.membros');
 
        }, function (error) {
           $ionicLoading.hide();
	       var alertPopup = $ionicPopup.alert({
	       title: 'Sing Up error',
	       cssClass:'popup',
	       template: error
	       });
        });
 
      }else{
      	$ionicLoading.hide();
      	var alertPopup = $ionicPopup.alert({
	       title: 'Sing Up error',
	       cssClass:'popup',
	       template: 'Parece que você não digitou nada' 
	       });
      }
	  }else{
	  	        $ionicLoading.hide();
		      	var alertPopup = $ionicPopup.alert({
		       title: 'Sing Up error',
		       cssClass:'popup',
		       template: 'Entrada inválida' 
		       });
	      }
  }

}])
 