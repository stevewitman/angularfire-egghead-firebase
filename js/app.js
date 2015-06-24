var app = angular.module('bcpApp', ['firebase']);

app.constant('FIREBASE_URI', 'https://brilliant-fire-2881.firebaseio.com/');

app.controller('MainCtrl', ['$scope', 'ActivitysService', function ($scope, ActivitysService) {
    $scope.newActivity = { title: '', details: '', meet_time: '', meet_place: '', count: 0 };
    $scope.currentActivity = null;

    $scope.activities = ActivitysService.getActivitys();

    $scope.addActivity = function () {
        ActivitysService.addActivity(angular.copy($scope.newActivity));
        $scope.newActivity = { title: '', details: '', meet_time: '', meet_place: '', count: 0 };
    };

    $scope.updateActivity = function (id) {
        ActivitysService.updateActivity(id);
    };

    $scope.removeActivity = function (id) {
        ActivitysService.removeActivity(id);
    };
}]);

app.factory('ActivitysService', ['$firebase', 'FIREBASE_URI', function ($firebase, FIREBASE_URI) {
    var ref = new Firebase(FIREBASE_URI);
    var activities = $firebase(ref);


    var getActivitys = function () {
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
        getActivitys: getActivitys,
        addActivity: addActivity,
        updateActivity: updateActivity,
        removeActivity: removeActivity
    }
}]);
