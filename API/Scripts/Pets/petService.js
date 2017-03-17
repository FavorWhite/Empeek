
app.service('petService', function ($http) {


    //Create new record
    this.post = function (Pet) {
        var request = $http({
            method: "post",
            url: "/api/Pets",
            data: Pet
        });
        return request;
    }
    ////Get Single Records
    //this.get = function (PetId) {
    //    return $http.get("/api/Pets/" + PetId);
    //}

    //Get All User's Pets
    this.getPets = function (userId) {
       // var queryString = "/api/Pets/" + userId;
      
        var request = $http({
            method: "get",
            url: "/api/Pets/" + userId

        });
        return request;
    }


    ////Update the Record
    //this.put = function (EmpNo, Employee) {
    //    var request = $http({
    //        method: "put",
    //        url: "/api/Pets/" + EmpNo,
    //        data: Employee
    //    });
    //    return request;
    //}

    //Delete the Record
    this.delete = function (PetId) {
        var request = $http({
            method: "delete",
            url: "/api/Pets/" + PetId
        });
        return request;
    }
});