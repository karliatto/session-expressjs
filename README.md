# session-expressjs
Simple website with session managment, login and sign up

* sign up
* login
* logout
* using hash password


## Requirements 
* [Nodejs](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/) 
* [ExprssJS](https://www.expressjs.com/) 
* [knexJS](https://www.knexjs.org/) 

## Getting Started

Using phpMyAdmin (or some other MySQL admin tool):
* Create a database named __session_expressjs__
* Create a table in the database named __users__ with the following structure:
```sql
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(11) NOT NULL,
  `password` varchar(72) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB ;
```
* Add a user to the __session_expressjs__ database with the same name. Sample SQL statement to do this:
```sql
CREATE USER 'session_expressjs'@'localhost' IDENTIFIED BY  'password';

GRANT USAGE ON * . * TO  'session_expressjs'@'localhost' IDENTIFIED BY  'password' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0 ;

GRANT ALL PRIVILEGES ON  `session_expressjs` . * TO  'session_expressjs'@'localhost';
```
* A table with session will be created automatically by 'express-session'

Clone this repository to your local environment by using the following command from a terminal window:
```
git clone https://github.com/karliatto/session-expressjs.git
```

Change into the directory that was just created:
```
cd session-expressjs
```

Install node modules:
```
npm install
```

Run the web server:
```
node index.js
```

Open your browser and navigate to the following URL:
[localhost:3000/registro](http://localhost:3000/registro)

* Register with user and password
* Login
* To logout go to [localhost:3000/logout](http://localhost:3000/registro)

