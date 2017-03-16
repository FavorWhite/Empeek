

//The controller is having 'petService' dependency.
//This controller makes call to methods from the service 
app.controller('petController', function ($scope, petService) {

    $scope.IsNewRecord = 1; //The flag for the new record

    loadRecords();

    //Function to load all Employee records
    function loadRecords() {
        var promiseGet = petService.getPets(); //The MEthod Call from service

        promiseGet.then(function (pl) { $scope.Employees = pl.data },
              function (errorPl) {
                  $log.error('failure loading Employee', errorPl);
              });
    }

    //The Save scope method use to define the Employee object.
    //In this method if IsNewRecord is not zero then Update Employee else 
    //Create the Employee information to the server
    $scope.save = function () {
        var Pet = {
            petId: $scope.petId,
            Name: $scope.Name
        };
        //If the flag is 1 the it si new record
        if ($scope.IsNewRecord === 1) {
            var promisePost = petService.post(Pet);
            promisePost.then(function (pl) {
                $scope.petId = pl.data.petId;
                loadRecords();
            }, function (err) {
                console.log("Err" + err);
            });
        }
        //else { //Else Edit the record
        //    var promisePut = petService.put($scope.petId, Pet);
        //    promisePut.then(function (pl) {
        //        $scope.Message = "Updated Successfuly";
        //        loadRecords();
        //    }, function (err) {
        //        console.log("Err" + err);
        //    });
        //}



    };

    //Method to Delete
    $scope.delete = function () {
        var promiseDelete = petService.delete($scope.petId);
        promiseDelete.then(function (pl) {
            $scope.Message = "Deleted Successfuly";
            $scope.petId = 0;
            $scope.Name = "";
            loadRecords();
        }, function (err) {
            console.log("Err" + err);
        });
    }

    //Method to Get Single Employee based on EmpNo
    $scope.get = function (Pet) {
        var promiseGetSingle = petService.get(Pet.petId);

        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.petId = res.petId;
            $scope.Name = res.Name;

            $scope.IsNewRecord = 0;
        },
                  function (errorPl) {
                      console.log('failure loading Employee', errorPl);
                  });
    }
    //Clear the Scopr models
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.petId = 0;
        $scope.Name = "";
    }
});