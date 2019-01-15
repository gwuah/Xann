# Xann
:cop: An authorization library for express applications. <br>
Still WIP, expect alot of changes and more documentation.


# Usage :
Routes are parsed with regex, hence you should declare them in the order which they are arranged in your main application. Else you'll match the wrong routes. This is a pattern that goes goes way back to expressjs itself.

```javascript
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

// sample usage, (check test folder)
console.log(auth.User('admin').canAccess({
  resource:'customers', 
  request: {method: 'GET', url: '/'} // request object from express
}))
```

# API
