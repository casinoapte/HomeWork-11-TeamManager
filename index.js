// REQUIREMENTS //
const inquirer = require("inquirer");
const mysql = require("mysql");
const path = require("path");
const connection = require("./db/connection")
// const config = require("./config.json");


// JAVASCRIPT //

function menu(){

    function init(){
        prompt();







    }

    function prompt(){

        inquirer.prompt([

            {
                type: "list",
                name: "userAction",
                message: "What would you like to do?",
                choices: ["View Employees", "Add Employees", "Delete Employee", "Edit Employee"]
            }
        ]).then((response) => {
            switch (response.userAction){
                case "View Employees":
                    viewEmployee();
                break
                case "Add Employees":
                    addEmployee();
                break
                case "Delete Employees":
                    deleteEmployee();
                break
                case "Delete Employees":
                    editEmployee();
                break
                default:
                    viewEmployee()
            }
        })

        async function viewEmployee(){
            
            // const employee = await



        }

        function addEmployee(){
            
        }

        async function deleteEmployee(){
            const employees = await db.findAllEmployees();
            const employeeChoices = 0;
            inquirer.prompt([
                {
                    type: "checkbox",
                    name: "del-employee",
                    message: "Which employees do you want to delete?",
                    choices: ["Bob", "Joe", "Sally"]
                }
            ]).then((response) => {
                await db.removeEmployee(employee.id)
                console.log("Employee Removed");
                prompt();
            })
        }

        function editEmployee(){
            
        }







    }
    init();
}

menu()
