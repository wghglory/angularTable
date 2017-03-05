/**
 * @author Guanghui Wang
 * @name addressbookApp.employee.client.service
 * @date 2017-03-02 15:06:09
 * @description Service for database/jsondata interaction, which is injected in controller
 */
app.service('employeeService', function($http) {

    //Get All Employees
    this.getAll = (lang) => {
        // return $http.get("/api/Employees"); // realworld code
        // based on selected language, load different data
        let data = '';
        switch (lang) {
            case '中文':
                data = 'data_zh.json';
                break;
            case 'English':
                data = 'data.json';
                break;
            default:
                data = 'data.json';
        }
        return $http.get(data);
    };

    //Delete the Records
    this.delete = (ids) => {
        // realworld code
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

    /********below is not used in this demo, but it's how i implement a restful api**********/
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
