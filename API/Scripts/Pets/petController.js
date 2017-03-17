

app.controller('petController', function ($scope, $routeParams, petService, userService) {
    ///////
    $scope.UserId = $routeParams.id;
    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.q = '';
    $scope.PetsCount = 0;
    $scope.numberOfPages = function () {
        return Math.ceil($scope.Pets.length / $scope.pageSize);
    }
    ///////

    loadRecords();

    function loadRecords() {
        $scope.PetsCount = 0;
        var promiseGetPets = petService.getPets($scope.UserId);
        promiseGetPets.then(function (pl) {
            $scope.Pets = pl.data;
            $scope.PetsCount += pl.data.length;
        },
              function (errorPl) {

                  $log.error('failure loading Pets', errorPl);
              });
        var promiseGetUser = userService.get($scope.UserId);
        promiseGetUser.then(function (pl) {
            $scope.UserName = pl.data.Name;
        },
              function (errorPl) {

                  $log.error('failure loading Users', errorPl);
              });

    };


    $scope.add = function () {
        var Pet = {
            Name: $scope.Name,
            UserId: $scope.UserId
        };
        $scope.clear();
        var promisePost = petService.post(Pet);
        promisePost.then(function (pl) {
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    };

    //Method to Delete
    $scope.delete = function (petId) {
        var promiseDelete = petService.delete(petId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.petId = 0;
            $scope.Name = "";
            loadRecords();
        },
            function (err) {
                console.log("Err" + err);
            });
    };

    //Clear the models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.Name = "";
    };
});
