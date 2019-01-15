# Xann
:cop: An authorization library for express applications. <br>


# Usage :
Routes are parsed with regex, hence you should declare them in the order which they are arranged in your main application. Else you'll match the wrong routes. This is a pattern that goes goes way back to expressjs itself.

```javascript
// filename: auth.js 
const Xann = require('../lib');
const router = Xann.router;

const auth = Xann({
  users: ["admin","manager"]
});

// looad configuration for various users
auth
.addConfigFor('admin')
.forResource('customers')({
  config: [router().all()]
}) 
.forResource('anonymous-customers')({
  config: [router().all()]
}).forResource('products')({
  config: [
    router("/").get().post().done(),
    router("/:id").get().put().delete().done(),
    router("/:id/location/:name").get().done()
  ]
})

module.exports = User;
```

```javascript
// filename: middleware.js

const User = require('./auth.js');

const admin = {
  canAccess: function (resource) {
    return (req, res, next) {
      const canAccess = User('admin').canAccess({
        resource: resource.toLowerCase(), 
        request: req
      });
      if (canAccess) {
        next()
      } else {
        next(new unAuthorizedError())
      }
    }
}

module.exports = {
  admin
}

```

```javascript
// filename: routes.js

const {admin} = require('./middleware.js');
const router = require('express').Router;

router('/', admin.canAccess('customer'), (req, res) => {
  console.log('admin can access this route')
})
```
