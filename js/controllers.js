'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

   .controller('HomeCtrl', [
   		'$scope',
		'$modal',
		'syncData',
		function($scope, $modal, syncData) {
			$scope.polls = syncData('polls');
			$scope.openNewPollModal = function() {
				var modalInstance = $modal.open({
					templateUrl: 'newPoll.html',
					controller: 'NewPollCtrl'	
				});
			};
   }])
   
   .controller('PollCtrl', [
   		'$scope',
		'$window',
		'$location',
		'$routeParams',
		'syncData',
		'Poll',
		function($scope, $window, $location, $routeParams, syncData, Poll) {
			$scope.user = {};
			$scope.poll = syncData('polls/' + $routeParams.pollId);
			$scope.pollId = $routeParams.pollId;
			$scope.userVote = Poll.userVote($routeParams.pollId);
			$scope.userVoted = Poll.userVoted($routeParams.pollId);
			$scope.vote = function() {
			  if (!$scope.userVoted) {
			      $window.localStorage.setItem($routeParams.pollId, $scope.user.vote);
				  $scope.poll.choices[$scope.user.vote].votes += 1;
				  $scope.poll.totalVotes += 1;
				  $scope.poll.$save();
				  $scope.userVote = $scope.user.vote;
				  $scope.userVoted = true;
			  }
			  else {
			      alert('You already voted');  
			  }
		   };
		   $scope.removePoll = function() {
				$scope.poll.$remove();
				$location.path('#/');   
		   };
		
   }])
   
   .controller('NewPollCtrl', [
   		'$scope',
		'$modalInstance',
		'Poll',
		function($scope, $modalInstance, Poll) {
			$scope.poll = Poll.model;
			$scope.addChoice = function() {
				Poll.addChoice($scope.poll);
			};
			$scope.createPoll = function() {
				Poll.create($scope.poll, function() {
					$modalInstance.close();	
				});
			};
			$scope.cancel = function() {
				$modalInstance.dismiss('cancel');	
			};
   		}
   ])
   
   .controller('NavigationCtrl', ['$scope', function($scope) {
	  $scope.isCollapsed = true; 
   }])

  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newMessage = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 10);

      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage ) {
            $scope.messages.$add({text: $scope.newMessage});
            $scope.newMessage = null;
         }
      };
   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
      $scope.email = null;
      $scope.pass = null;
      $scope.confirm = null;
      $scope.createMode = false;

      $scope.login = function(cb) {
         $scope.err = null;
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else {
            loginService.login($scope.email, $scope.pass, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
         }
      };

      $scope.createAccount = function() {
         $scope.err = null;
         if( assertValidLoginAttempt() ) {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err? err + '' : null;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function() {
                     loginService.createProfile(user.uid, user.email);
                     $location.path('/account');
                  });
               }
            });
         }
      };

      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {
      syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

      $scope.logout = function() {
         loginService.logout();
      };

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         }
      }

   }]);