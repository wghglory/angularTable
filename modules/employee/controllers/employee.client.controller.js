/**
 * @author Guanghui Wang
 * @name addressbookApp.employee.client.controller
 * @date 2017-03-02 15:06:15
 * @description employee controller interacts with view. Inject employeeService(can be a restful api)
 */
'use strict';

app.controller('employeeController', ['$scope', 'employeeService', function($scope, employeeService) {
    // when changing language, reload data for that language
    $scope.$on('reloadDataEvent', (obj, locale) => {
        loadData(locale);
    });

    // call employeeService and load data
    function loadData(lang) {
        employeeService.getAll(lang).then(function(res) {
            $scope.Employees = res.data; //bind all data to employees
            for (let emp of $scope.Employees) {
                emp.showEdit = false; //add prop showEdit, meaning default disable edit mode. Double click enables editing
                emp.selected = false; //default none of rows is selected
            }
            $scope.selectedIds = []; //array contains all selected ids, for multi-delete
            $scope.isAllSelected = false; //default check all is false
        });
    }

    // call immediately to initialize data
    loadData();

    // double clicking cell to edit, clicking same row again to quit;
    // second time, clicking another row: quit previous row editing and enable current row editing
    $scope.toggleEdit = (emp) => {
        // for other employees (not current editing one), set showEdit and selected false
        for (let e of $scope.Employees) {
            if (e != emp) {
                e.showEdit = false;
                e.selected = false;
            }
        }
        emp.showEdit = !emp.showEdit;
        emp.selected = !emp.selected;

        // selected id array contains all ids selected, which will be used for multi-delete
        $scope.selectedIds = [];
        $scope.selectedIds.push(emp.id);
        $scope.message = `selected id: ${$scope.selectedIds[0]}`;
    };

    // check checkbox and add all ids to $scope.selectedIds in order to multi-delete
    $scope.saveIds = id => {
        let arr = $scope.selectedIds;
        // remove existing id, add non-existing id
        if (arr.includes(id)) {
            const index = arr.indexOf(id);
            arr.splice(index, 1);
        } else {
            arr.push(id);
        }
        $scope.message = `selected ids: ${$scope.selectedIds.join(',')}`;
    };

    // check first checkbox to select all/none
    $scope.toggleAll = () => {
        let toggleStatus = $scope.isAllSelected;
        // all other checkboxes will be selected when checking first one
        angular.forEach($scope.Employees, (emp) => {
            emp.selected = toggleStatus;
        });

        // clear selectedIds
        $scope.selectedIds = [];

        if (toggleStatus) {
            // add all ids to arr
            for (let emp of $scope.Employees) {
                $scope.selectedIds.push(emp.id);
            }
        }
        $scope.message = `selected ids: ${$scope.selectedIds.join(',')}`;
    }
    // if checking every checkbox one by one, first checkbox should be checked as well
    $scope.optionToggled = () => {
        $scope.isAllSelected = $scope.Employees.every((emp) => {
            return emp.selected;
        });
    };

    // "Save Button": 1 save new record, 2 update modified record
    $scope.save = () => {

        // update modified record
        if ($scope.selectedIds.length) {

            let id = $scope.selectedIds[0];

            for (let emp of $scope.Employees) {
                if (emp.id === id) {
                    emp.showEdit = false; //after saving, quit editing mode
                    emp.selected = false;
                    let message = `update record => id:${emp.id}, name:${emp.name}, location:${emp.location}, office: ${emp.office}, salary: ${emp.salary}, officeLine:${emp.phone.office}, cellphone:${emp.phone.cell}`;
                    $scope.message = message;
                    break;
                }
            }

        } else {
            // save added record, assume not clicking add again before saving, so last row contains all record
            let {
                name,
                office,
                location,
                phone,
                salary
            } = $scope.Employees[$scope.Employees.length - 1];
            $scope.Employees[$scope.Employees.length - 1].showEdit = false;
            $scope.message = `new record => name:${name}, location:${location}, office: ${office}, salary: ${salary}, officeLine:${phone.office}, cellphone:${phone.cell}, should be sent to server using $http/$resource etc in real world`;
        }
    };

    // multi-delete
    $scope.delete = () => {
        let message = employeeService.delete($scope.selectedIds);
        let arrLeft = []; //employees who are not deleted

        // loop thru all employees and add all left ones to arr
        for (let emp of $scope.Employees) {
            if (!$scope.selectedIds.includes(emp.id)) {
                arrLeft.push(emp);
            }
        }
        $scope.Employees = arrLeft;
        $scope.message = message;
    };

    // add a new empty row
    $scope.add = () => {

        for (let emp of $scope.Employees) {
            emp.selected = false;
        }
        $scope.isAllSelected = false;

        let newEmp = {
            "name": "",
            "location": "",
            "office": "",
            "salary": "",
            "phone": {
                "office": "",
                "cell": ""
            }
        };
        newEmp.showEdit = true; // enable editing for new row
        $scope.Employees.push(newEmp);
        $scope.selectedIds = [];
        $scope.message = 'Please type in the empty fields and then click Update to see result. Do not click "add" again before finishing up';
    };

}]);
