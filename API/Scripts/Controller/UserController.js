


app.controller('userController', function ($scope, $filter, userService) {
    ///////
    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.q = '';
    $scope.getData = function () {
        return $filter('filter')($scope.Users, $scope.q);
    }

    $scope.numberOfPages = function () {
        return Math.ceil($scope.getData().length / $scope.pageSize);
    }
    ///////

    $scope.IsNewRecord = 1; //The flag for the new record

    loadRecords();

    //Function to load all Employee records
    function loadRecords() {
        var promiseGet = userService.getUsers(); //The MEthod Call from service

        promiseGet.then(function (pl) {
            $scope.Users = pl.data;
            $scope.Users.forEach(function (el) {
                if (el.Pets === null) {
                    el.Pets = [];
                }
            });

        },
              function (errorPl) {
                  $log.error('failure loading Employee', errorPl);
              });
    }

    $scope.add = function () {
        var User = {
            Name: $scope.Name
        };
        $scope.clear();
        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = userService.post(User);
            promisePost.then(function (pl) {
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };

    //Method to Delete
    $scope.delete = function (userId) {
        var promiseDelete = userService.delete(userId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.UserId = 0;
            $scope.Name = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //Method to Get Single Employee based on EmpNo
    $scope.get = function (User) {
        var promiseGetSingle = userService.get(User.UserId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.EmpNo = res.UserId;
            $scope.EmpName = res.Name;

            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading Employee', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.Name = "";

    }
});
app.filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});