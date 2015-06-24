var app = angular.module('bcpApp', ['firebase']);

app.constant('FIREBASE_URI', 'https://brilliant-fire-2881.firebaseio.com/');

app.controller('MainCtrl', ['$scope', 'ItemsService', function ($scope, ItemsService) {
    $scope.newItem = { activity: '', meeting_time_place: '', count: 0 };
    $scope.currentItem = null;

    $scope.items = ItemsService.getItems();

    $scope.addItem = function () {
        ItemsService.addItem(angular.copy($scope.newItem));
        $scope.newItem = { activity: '', meeting_time_place: '', count: 0 };
    };

    $scope.updateItem = function (id) {
        ItemsService.updateItem(id);
    };

    $scope.removeItem = function (id) {
        ItemsService.removeItem(id);
    };
}]);

app.factory('ItemsService', ['$firebase', 'FIREBASE_URI', function ($firebase, FIREBASE_URI) {
    var ref = new Firebase(FIREBASE_URI);
    var items = $firebase(ref);


    var getItems = function () {
        return items;
    };

    var addItem = function (item) {
        items.$add(item);
    };

    var updateItem = function (id) {
        items.$save(id);
    };

    var removeItem = function (id) {
        items.$remove(id);
    };

    return {
        getItems: getItems,
        addItem: addItem,
        updateItem: updateItem,
        removeItem: removeItem
    }
}]);
