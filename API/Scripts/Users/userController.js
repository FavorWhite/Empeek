app.controller('userController', function ($scope, $filter, userService, petService) {
    ///////
    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.q = '';
    $scope.PetsCount = 0;
    $scope.numberOfPages = function() {
        return Math.ceil($scope.Users.length / $scope.pageSize);
    };
    ///////

    loadRecords();

    function loadRecords() {
        $scope.PetsCount = 0;
        var promiseGetUsers = userService.getUsers(); //The MEthod Call from service

        promiseGetUsers.then(function (pl) {
            $scope.Users = pl.data;
            $scope.Users.forEach(function (el) {
                var promiseGetPets = petService.getPets(el.Id);
                promiseGetPets.then(function (pl) {
                    if (pl.data === null) {
                        el.Pets = [];
                    } else {
                        el.Pets = pl.data;
                    }
                    $scope.PetsCount += pl.data.length;
                });
            });
        });
    };
    //Method to Add
    $scope.add = function () {
        var User = {
            Name: $scope.Name
        };
        $scope.clear();

        var promisePost = userService.post(User);
        promisePost.then(function (pl) {
            loadRecords();
        },
            function (err) {
                console.log("Err" + err);
            });
    };


    //Method to Delete
    $scope.delete = function (userId) {
        var promiseDelete = userService.delete(userId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.UserId = 0;
            $scope.Name = "";
            loadRecords();
        },
            function (err) {
                console.log("Err" + err);
            });
    };


    //Clear the  models
    $scope.clear = function () {
        $scope.Name = "";
    };
});