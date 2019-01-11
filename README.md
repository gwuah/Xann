# Xann
:cop: An authorization library for express applications. <br>
Still WIP, expect alot of changes and more documentation.


# Usage :

```javascript
const Xann = require('../lib')

const auth = new Xann({appName: 'chilli'});
const users = auth.addUsers(["admin", "manager"]);

const adminConfig = auth.addConfigFor('admin').forResource('customers')({
  canAccessAllRoutes: true
}).forResource('anonymous-customers')({
  config: [
  {route: "/", methods: ["GET", "POST"]},
  {route: "/:id", methods: ["GET", "PUT", "DELETE"]}
]}).forResource('products')({
  config: [
  {route: "/", methods: ["GET", "POST"]},
  {route: "/:id", methods: ["GET", "PUT", "DELETE"]}
]})
```