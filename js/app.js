var app = angular.module('bcpApp', ['firebase']);

app.constant('FIREBASE_URI', 'https://brilliant-fire-2881.firebaseio.com/');

app.controller('MainCtrl', ['$scope', 'ActivitiesService', function ($scope, ActivitiesService) {
    $scope.newActivity = { title: '', details: '', meet_time: '', meet_place: '' };
    $scope.currentActivity = null;

    $scope.activities = ActivitiesService.getActivities();

    $scope.addActivity = function () {
        ActivitiesService.addActivity(angular.copy($scope.newActivity));
        $scope.newActivity = { title: '', details: '', meet_time: '', meet_place: '' };
    };

    $scope.updateActivity = function (id) {
        ActivitiesService.updateActivity(id);
    };

    $scope.removeActivity = function (id) {
        ActivitiesService.removeActivity(id);
    };
}]);

app.factory('ActivitiesService', ['$firebase', 'FIREBASE_URI', function ($firebase, FIREBASE_URI) {
    var ref = new Firebase(FIREBASE_URI);
    var activities = $firebase(ref);


    var getActivities = function () {
        return activities;
    };

    var addActivity = function (activity) {
        activities.$add(activity);
    };

    var updateActivity = function (id) {
        activities.$save(id);
    };

    var removeActivity = function (id) {
        activities.$remove(id);
    };

    return {
        getActivities: getActivities,
        addActivity: addActivity,
        updateActivity: updateActivity,
        removeActivity: removeActivity
    }
}]);

app.directive('bcpPlus', function () {
  return {
    templateUrl: "directives/bcp-plus.html",
    restrict: "E",
    scope: {
      activity: '='
    },
    controller: function($scope) {
      $scope.collapsed = false;
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed;
      }
    }
  }
});

app.directive('bcpDetails', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'directives/bcp-details.html',
    controller: function($scope) {
      $scope.collapsed = false;
      $scope.collapseDetails = function() {
        $scope.collapsed = true;
      }
      $scope.expandDetails = function() {
        $scope.collapsed = false;
      }
    }
  }
});
