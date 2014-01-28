'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('comments', ['syncData', function(syncData) {
    return {
		restrict: 'A',
		scope: {
			'pollId' : '=comments'
		},
		template: '<div class="contatiner">' +
		'           <h3>Comments</h3>' +
		'           <div class="well well-large">' +
		'             <div ng-repeat="comment in comments">' +
		'               <p><i class="glyphicon glyphicon-user"></i> <strong>{{ comment.user }}</strong> - <em>{{ comment.comment }}</em></p>' +
		'             </div>' +
		'           </div>' +
		'             <form ng-submit="addComment()">' +
		'               <div class="form-group">' +
		'                 <input class="form-control" type="text" ng-model="user.name" placeholder="Name" />' +
		'               </div>' +
		'               <div class="form-group">' +
		'                 <textarea class="form-control" ng-model="user.comment" ng-keydown="addComment($event)" placeholder="Comment"></textarea>' +
		'               </div>' +
		'               <button class="btn btn-default pull-right" type="submit"><i class="glyphicon glyphicon-plus"></i><span> Add Comment</span></button>' +
		'             </form>' +
		'	       </div>',
		link: function($scope, $element, $attrs) {
			$scope.user = {};
			$scope.comments = syncData('polls/' + $scope.pollId + '/comments');
			$scope.addComment = function(e) {
				if (e) {
					if (e.keyCode != 13) { return; }	
				}
				$scope.comments.$add({
					user: $scope.user.name,
					comment: $scope.user.comment
				});
				$scope.user.comment = '';
			};
		}
	};
  }]);
