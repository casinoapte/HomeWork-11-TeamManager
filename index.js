// REQUIREMENTS //
const Employee = require("./lib/employee")
const Role = require("./lib/role")
const inquirer = require("inquirer");
const mysql = require("mysql");
const path = require("path");
const connection = require("./db/connection");



// JAVASCRIPT //

function menu() {
    function prompt() {
        inquirer.prompt([
            {
                type: "list",
                name: "userAction",
                message: "What would you like to do?",
                choices: ["View Employees", "Add Employees", "Delete Employees", "Edit Employees"]
            }
        ]).then((response) => {
            switch (response.userAction) {
                case "View Employees":
                    viewEmployee();
                    break
                case "Add Employees":
                    addEmployee();
                    break
                case "Delete Employees":
                    deleteEmployee();
                    break
                case "Edit Employees":
                    editEmployee();
                    break
                default:
                    viewEmployee()
            }
        })
    }


    // VIEW EMPLOYEES //

    function viewEmployee() {
        var query = connection.query( "SELECT employee.id, employee.firstname, employee.lastname, role.salary, role.id, role.title FROM employee INNER JOIN role ON employee.id = role.id", function (err, res) {
            if (err) throw err;
            console.table(res);
            prompt();
        })
    }
    
    "SELECT employee.id, employee.firstname, employee.lastname, employee.manager_id, department.depart_name, department.id FROM employee INNER JOIN department ON employee.id = department.id"

    // ADD EMPLOYEE //

    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "employeeFirstName",
                message: "What is the first name of the employee you are adding?"
            },
            {
                type: "input",
                name: "employeeLastName",
                message: "What is the last name of the employee you are adding?"
            },
            {
                type: "input",
                name: "employeeRole",
                message: "What is this employees role ID?"
            },
            {
                type: "input",
                name: "employeeManager",
                message: "What is this employees Manager ID?"
            },
            {
                type: "input",
                name: "roleTitle",
                message: "What is this employees title?"
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is this employees salary?"
            },
            {
                type: "input",
                name: "roleDepartID",
                message: "What is this employees department ID?"
            },
        ])
            .then((res) => {
                createEmp(res);
            })
        function createEmp(res) {
            console.log("Added Employee to Database...");
            const newEmployee = new Employee(res.employeeFirstName, res.employeeLastName, res.employeeRole, res.employeeManager)
            const newRole = new Role(res.roleTitle, res.roleSalary, res.roleDepartID)
            var query = connection.query("INSERT INTO employee SET ?", newEmployee, function (err, res) {
                if (err) throw err;
            })
            var query = connection.query("INSERT INTO role SET ?", newRole, function (err, res) {
                if (err) throw err;
            })
            prompt();
        }
    }


    // DELETE EMPLOYEES //

    async function deleteEmployee(res) {
        inquirer.prompt([
            {
                type: "input",
                name: "employeeRemove",
                message: "Which employee do you want to delete?",
            }
        ]).then((res) => {

            var remEmployee = res.employeeRemove
            var query = connection.query("DELETE  FROM employee WHERE firstname =? ", remEmployee, function (err, res) {
                if (err) throw err;
            })
            prompt();
        })

    }



    function editEmployee() {
        prompt();
    }











    prompt();
}

menu()