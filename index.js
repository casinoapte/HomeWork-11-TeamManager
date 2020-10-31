// CLASSES //
const Employee = require("./lib/employee")
const Role = require("./lib/role")
const Department = require("./lib/department")


// REQUIREMENTS //
const inquirer = require("inquirer");
const connection = require("./db/connection");

// JAVASCRIPT //

function menu() {

    // STARTING PROMPT QUESTIONS //

    function prompt() {
        inquirer.prompt([
            {
                type: "list",
                name: "userAction",
                message: "What would you like to do?",
                choices: ["View Employees", "View Roles", "View Departments", "View All", "Add Employees", "Delete Employees", "Edit Employees"]
            }
        ]).then((response) => {
            switch (response.userAction) {
                case "View Employees":
                    viewEmployee();
                    break
                case "View Roles":
                    viewRole();
                    break
                case "View Departments":
                    viewDepartment();
                    break
                case "View All":
                    viewAll();
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
        var query = connection.query("SELECT firstname, lastname, role_id, manager_id FROM employee", function (err, res) {
            if (err) throw err;
            console.table(res);
            prompt();
        })
    }

    // VIEW ROLES //

    function viewRole() {
        var query = connection.query("SELECT title, salary, department_id FROM role", function (err, res) {
            if (err) throw err;
            console.table(res);
            prompt();
        })
    }

    // VIEW DEPARTMENT //

    function viewDepartment() {
        var query = connection.query("SELECT depart_name FROM department", function (err, res) {
            if (err) throw err;
            console.table(res);
            prompt();
        })
    }

    // VIEW ALL //

    function viewAll() {
        var query = connection.query("SELECT employee.id, employee.firstname, employee.lastname, department.depart_name, role.title, role.salary FROM employee INNER JOIN department ON employee.id = department.id INNER JOIN role ON employee.id = role.id", function (err, res) {
            if (err) throw err;
            console.table(res);
            prompt();
        })
    }

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
                name: "departName",
                message: "What is this employees department Name?"
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
            const newDep = new Department(res.departName)

            var query = connection.query("INSERT INTO employee SET ?", newEmployee, function (err, res) {
                if (err) throw err;
            })
            var query = connection.query("INSERT INTO role SET ?", newRole, function (err, res) {
                if (err) throw err;
            })
            var query = connection.query("INSERT INTO department SET ?", newDep, function (err, res) {
                if (err) throw err;
            })
            prompt();
        }
    }


    // DELETE EMPLOYEES //

    function deleteEmployee(res) {
        var query = connection.query("SELECT firstname, lastname from employee", function (err, data) {
            if (err) throw err;
            console.table(data);
            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeRemove",
                    message: "Which employee do you want to delete?",
                    choices: data
                }
            ])
        }).then((res) => {
            var remEmployee = data.employeeRemove
            var query = connection.query("DELETE firstname FROM employee WHERE firstname =?", remEmployee, function (err, data) {


                
            })
        })
        prompt();
    }



    function editEmployee() {





        prompt();
    }

    prompt()
}

menu()