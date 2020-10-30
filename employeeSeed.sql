DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (

    id INT NOT NULL AUTO_INCREMENT,
    depart_name VARCHAR(30),
     PRIMARY KEY (id)
);


CREATE TABLE role (

    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE employee (

    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
     PRIMARY KEY (id)
);
    

INSERT INTO department(depart_name)
VALUES ("HR"), ("SALES"), ("TECH");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 50000, 1), ("Developer", 100000, 2), ("SalesMan", 80000, 3);

INSERT INTO employee (firstname, lastname, role_id, manager_id)
VALUES ("Tom", "Hanks", 123, 4056), ("Joe", "Frazier", 8910, 9981), ("Billy", "Bow", 1414, 9981);
