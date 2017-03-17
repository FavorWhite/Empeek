
app.service('userService', function ($http) {
 
     
    //Create new record
    this.post = function (User) {
        var request = $http({
            method: "post",
            url: "/api/Users",
            data: User
        });
        return request;
    }
    //Get Single Records
    this.get = function (UserId) {
        return $http.get("/api/Users/" + UserId);
    }
 
    //Get All Employees
    this.getUsers = function () {
        return $http.get("/api/Users");
    }
 
 
    ////Update the Record
    //this.put = function (EmpNo, Employee) {
    //    var request = $http({
    //        method: "put",
    //        url: "/api/EmployeesAPI/" + EmpNo,
    //        data: Employee
    //    });
    //    return request;
    //}


    //Delete the Record
    this.delete = function (UserId) {
        var request = $http({
            method: "delete",
            url: "/api/Users/" + UserId
        });
        return request;
    }
});