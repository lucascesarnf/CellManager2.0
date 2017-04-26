angular.module('app.controllers', [])
     
.controller('loginCtrl', ['$scope', '$stateParams','$ionicLoading','$state','$ionicPopup','$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,$state,$ionicPopup,$ionicHistory) {
  $ionicHistory.nextViewOptions({
  disableAnimate: true,
  disableBack: true
});
  $scope.init=function(){
    $ionicLoading.show();
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $ionicHistory.nextViewOptions({
             disableBack: true
             });
    $ionicLoading.hide();
    $state.go('tabsController.membros');
  }else{
    $ionicLoading.hide();
  }
  });
  };
$scope.login = function(user) {

	if(typeof user !== "undefined"){
	$ionicLoading.show();
	// FireBase
  if(user.email != "undefined" && user.password != "undefined" ){
	firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(function(result) {
    /*
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified,cell,church;
    */       $ionicHistory.nextViewOptions({
             disableBack: true
             });
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
            $ionicHistory.nextViewOptions({
             disableBack: true
             });
            $ionicLoading.hide();
             $state.go('tabsController.conta');
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
.controller('membrosCtrl', ['$scope', '$stateParams','$ionicLoading','$state','$ionicPopup','fireBaseData','safeApply','$firebaseArray','$ionicListDelegate','$ionicModal',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicLoading,$state,$ionicPopup,fireBaseData,safeApply,$firebaseArray,$ionicListDelegate,$ionicModal) {
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
          }
          });
}
$ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.addMember = function(res){
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
            });
         }
       });
    $scope.modal.hide();
    }else{
       $scope.modal.hide();
    }
  };
  //###########SHOW MEMBER#############
   $scope.showMembro =function(item){
      var date = new Date(item.datanasc);
     $scope.FromDate = ('0' + date.getDate()).slice(-2)+ '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
      //****************************
         var alertPopup = $ionicPopup.alert({
           title: '<h3>Membro</h3>',
           cssClass:'popup',
           template: '<strong>Nome: </strong>'+item.name +'<hr>'+ '<strong>Telefone: </strong>'+ item.tel+'<hr>'+ '<strong>Data de nascimento: </strong>'+ $scope.FromDate  +'<hr>'+'<strong>Email: </strong>'+item.email +'<hr>'+'<strong>Endereço: </strong>'+item.end +'<hr>'+'<strong>Status: </strong>'+item.status 
         });
         alertPopup.then(function(res) {
         }); 

    }
  //##################################

    //*************DELETE************************* 
    $scope.delete = function(item) {
         $ionicPopup.confirm({
                  title: '<h3>Deletar Membro</h3>',
                  subTitle: '<h5>Você realmente quer deletar:</h5>',
                  content: '<strong>Nome: </strong>'+item.name
                }).then(function(res) {
                  if(res) {
                    $scope.items.$remove(item);
                   //$scope.memberRefresh();
                  } 
                });
      };  
    //****************FIM DELETE*************** 
    //***********EDIT***************
    $scope.close = function(){
     $ionicListDelegate.closeOptionButtons();
    };
}])
   
.controller('contaCtrl', ['$scope', '$stateParams','$firebaseObject','safeApply','fireBaseData','$ionicHistory','$state','$ionicPopup','$ionicModal',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$firebaseObject,safeApply,fireBaseData,$ionicHistory,$state,$ionicPopup,$ionicModal) {
   $scope.init= function(){
        $scope.undefined = "undefined";
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.cell = user;
            $scope.cell_extras= $firebaseObject(fireBaseData.refUser().child(user.uid));
            //Acount
            $scope.data_cell = $scope.cell;

            $scope.data_extras = $scope.cell_extras;
            //Cell
            fireBaseData.refUser().child(user.uid).child("leader").on("value", function(snapshot) {
            if(snapshot.val()!== null){
            $scope.birthdayLeader = new Date(snapshot.val().datanasc);
            $scope.FromDate = $scope.FromDate = ('0' + $scope.birthdayLeader.getDate()).slice(-2)+ '/' + ('0' + ($scope.birthdayLeader.getMonth() + 1)).slice(-2) + '/' + $scope.birthdayLeader.getFullYear();
              }
            },function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            $scope.birthdayLeader = new Date();
            $scope.FromDate = $scope.FromDate = ('0' + $scope.birthdayLeader.getDate()).slice(-2)+ '/' + ('0' + ($scope.birthdayLeader.getMonth() + 1)).slice(-2) + '/' + $scope.birthdayLeader.getFullYear();
            });
            safeApply($scope);
          }
        });
      }

        $ionicModal.fromTemplateUrl('templates/modal.html', {
           scope: $scope
        }).then(function(modal) {
        $scope.modal = modal;
        });

        $scope.singOut= function(){
         $ionicPopup.confirm({
                  title: '<h3>Deseja sair?</h3>',
                  subTitle: '<h5>Você realmente quer sair do app</h5>',
                }).then(function(res) {
                  if(res) {
                    firebase.auth().signOut().then(function() {
                    $ionicHistory.nextViewOptions({
                      disableBack: true
                    });
                    console.log('Signed Out');
                     $state.go('login');
                   }, function(error) {
                    console.error('Sign Out Error', error);
                   });
                  } 
                });
        };

        $scope.show=function(text){
          if(typeof text !== "undefined"){
              $ionicPopup.alert({
                  title: '<h3>'+$scope.cell.displayName+'</h3>',
                  content: text
                }).then(function(res) {
                });
            }else{
              $ionicPopup.alert({
                  title: '<h3>'+$scope.cell.displayName+'</h3>',
                  content: "Você ainda não colocou nada aqui, clique em editar e entre com os dados!"
                }).then(function(res) {
                });
            }
        };
   $scope.showDiretoria =function(item){
       if(typeof item !== "undefined"){
             //
              var date = new Date(item.datanasc);
              $scope.FromDate = ('0' + date.getDate()).slice(-2)+ '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
              var alertPopup = $ionicPopup.alert({
               title: '<h3>Membro</h3>',
               cssClass:'popup',
               template: '<strong>Nome: </strong>'+item.name +'<hr>'+ '<strong>Telefone: </strong>'+ item.tel+'<hr>'+ '<strong>Data de nascimento: </strong>'+ $scope.FromDate  +'<hr>'+'<strong>Email: </strong>'+item.email +'<hr>'+'<strong>Endereço: </strong>'+item.end +'<hr>' 
             });
             alertPopup.then(function(res) {
             }); 
            //
            }else{
              $ionicPopup.alert({
                  title: '<h3>'+$scope.cell.displayName+'</h3>',
                  content: "Você ainda não colocou nada aqui, clique em editar e entre com os dados!"
                }).then(function(res) {
                });
            }
    }
        $scope.upDateData= function(date,cell,cell_extras){
         $ionicPopup.confirm({
                  title: '<h3>Deseja Atualizar os dados?</h3>'
                }).then(function(res) {
                  if(res){
                    currentDate = new Date();
                    if(date != currentDate){
                      if(cell_extras.leader != null){
                      cell_extras.leader.datanasc = date;
                      }
                    }
                  if(cell_extras.adress != null && cell_extras.host != null && cell_extras.leader != null){
                  var user = firebase.auth().currentUser;
                  fireBaseData.refUser().child(user.uid).update({
                  adress:cell_extras.adress,
                  host: cell_extras.host,
                  leader: cell_extras.leader,
                  });
                 $scope.modal.hide();
                 }else{
                    //
                    var alertPopup = $ionicPopup.alert({
                     title: 'Você não atualizou nada',
                     template: 'Preencha todos os campos para que você possa continuar'
                     });
                 }
               }
                });
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
 