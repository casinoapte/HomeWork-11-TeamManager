const connection = require("./connection")

class DB {
    constructor(connection) {
        this.connection = connection
    }

    findAllEmployees(){
        return this.connection.query("Select employee.id, employee.firstname, employee.lastname, employee.role_id, employee.manager_id").join("")
    }
// select emlpoyee.id, emp.fn, emp.ls FROM employee LEFT JOIN role on ..... LEFT JOIN emp.manger on manage.id .... LEFT JOIN.... 

    removeEmployee(id){
        return this.connection.query("delete from employee where id=?", id)
    }

}


module.exports = DB