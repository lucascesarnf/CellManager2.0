angular.module('app.services', [])

.factory('fireBaseData', [function($firebase){
	var ref = new Firebase("https://cellmanager-a6723.firebaseio.com"),
	refUser = new Firebase("https://cellmanager-a6723.firebaseio.com/users");
	return {
	    ref: function() {
	      return ref;
	    },
	    refUser: function() {
	      return refUser;
	    },
	    getMembros: function(){
	   var user = firebase.auth().currentUser;
       var membros = [];
        if (user) {
           var memberRef = refUser.child(user.uid).child("membros");
           var newMemberRef = memberRef.ref();
           newMemberRef.on("child_added", function(snapshot) {
           	//console.log(snapshot.val());
              var member = snapshot.val();
              membros.push(angular.fromJson(member));
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });
          return membros;
	    }else{
	    	return null;
	    }
    }
   }

}])
.factory('safeApply', [function($rootScope) {
    return function($scope, fn) {
        var phase = $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) {
                $scope.$eval(fn);
            }
        } else {
            if (fn) {
                $scope.$apply(fn);
            } else {
                $scope.$apply();
            }
        }
    }
}])

.service('BlankService', [function(){

}]);