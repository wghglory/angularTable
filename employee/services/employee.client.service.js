app.service('employeeService', function($http) {

    //Get All Employees
    this.getAll = () => {
        // return $http.get("/api/Employees");
        return $http.get("data.json");
    };

    //Delete the Records
    this.delete = (ids) => {
        // let request = $http({
        //     method: "delete",
        //     url: "/api/Employees/" + id
        // });
        // return request;

        if (!ids.length) {
            return 'you didn\'t select any row';
        } else {
            return `The record(s) with id=${ids.join(',')} has(have) been deleted`;
        }
    };

    /*below is not used in this demo, but it's how i implement a restful api*/
    //Create new record
    this.post = (employee) => {
        let request = $http({
            method: "post",
            url: "/api/Employees",
            data: employee
        });
        return request;
    };

    //Get Single Record
    this.get = (id) => {
        return $http.get("/api/Employees/" + id);
    };

    //Update the Record
    this.put = (id, employee) => {
        let request = $http({
            method: "put",
            url: "/api/Employees/" + id,
            data: employee
        });
        return request;
    };

});
