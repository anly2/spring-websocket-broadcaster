
angular.module('listener', [])
.controller("feedCtrl", ["$scope", function($scope) {
	$scope.messages = ["here", "and", "there"];

	$scope.stompClient = (function() {
		var socket = new SockJS('/websocket');
		var stompClient = Stomp.over(socket);

		stompClient.debug = false;
		stompClient.connect({}, function (frame) {
		    stompClient.subscribe('/topic/newsfeed', function (news) {
		        $scope.messages.push(""+news.body);
		        $scope.$apply();
		    });
		});

		$scope.$on("$destroy", function() {
			stompClient.disconnect();
		})
	}());
}]);