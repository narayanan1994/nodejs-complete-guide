[<<-- back to main](../../README.md) - [<-- previous section](../section%209%20dynamic%20routes%20and%20advanced%20models/section9-notes.md) - [next section -->](../section%2011%20understanding%20sequelize/section11-notes.md)

# sample: image urls
- https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png

# WORKING WITH SQL DATABASE KEY POINTS:
```
- SQL vs NoSQL
SQL:
1. Data relations between tables - 
    one to one
    one to many
    many to many
2. Structured Query Language
    mix of SQL keywords and parameters/data
3. Structured data 
    like employee table -> all entries with id, name, dept etc
NoSQL:
1. Unstructured/schemaless data
    like users =>
        1. {name:max,age:25}
        2. {name:manu}
2. No relations, increased performance, few connections, no need for big join queries

SQL -> Database -> Tables -> table entries
NoSQL -> Database -> Collections -> Documents

Another diff for SQL vs NoSQL
as there the data keeps increasing we have to increase the scale of DB,
    - Horizontal scaling -> and more and more server and merge to Database
    - Vertical scaling -> increase the server size, cpu limits
```
# setting up mysql
- https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing

# Useful resource:
- Learn more about MySQL/ SQL in General: https://www.w3schools.com/sql/
- Learn more about the Node MySQL Package: https://github.com/sidorares/node-mysql2

[<<-- back to main](../../README.md) - [<-- previous section](../section%209%20dynamic%20routes%20and%20advanced%20models/section9-notes.md) - [next section -->](../section%2011%20understanding%20sequelize/section11-notes.md)