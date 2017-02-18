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
              var member = snapshot.val();
              membros.push(member);
            }, function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            });
          return membros;
	    }
	    return null;

    }
   }

}])

.service('BlankService', [function(){

}]);