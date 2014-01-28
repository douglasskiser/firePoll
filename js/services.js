(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', ['myApp.service.login', 'myApp.service.firebase'])
	  .factory('Poll', ['$window', 'syncData', function($window, syncData) {
		  var poll = {};
		  
		  
		  poll.userVoted = function(pollId) {
		      return $window.localStorage.getItem(pollId) ? true : false;  
		  };
		  poll.userVote = function(pollId) {
			  return $window.localStorage.getItem(pollId);
		  };
		  
		  poll.model = {
			question: '',
			choices: [
				{text: ''},
				{text: ''}
			]  
		  };
		  
		  poll.addChoice = function(pollObj) {
			return pollObj.choices.push({text: ''});  
		  };
		  
	  	poll.create = function(pollObj, cb) {
			var votes = syncData('polls');
			if (pollObj.question.length > 0) {
				var choiceCount = 0;
				for (var i = 0, length = pollObj.choices.length; i < length; i++) {
					var choice = pollObj.choices[i];
					if (choice.text.length > 0) {
						choiceCount += 1;
						choice.votes = 0;	
					}
				}
				
				if (choiceCount > 1) {
					votes.$add({
						question: pollObj.question,
						choices: pollObj.choices,
						totalVotes: 0	
					});
					cb();
				}
				else {
					alert('you must enter at least two choices');	
				}
			}
			else {
				alert('you must enter a question');	
			}
		};
		  
		  
		  return poll;
	  }]);

})();

