# Xann
:cop: An authorization library for express applications. <br>
Still WIP, expect alot of changes and more documentation.


# Usage :

```javascript
const Xann = require('../lib');
const router = Xann.router;

const auth = Xann({
  users: ["admin","manager"]
});

auth
  .addConfigFor('admin')
  .forResource('customers')({
    config: [
      router("/").all().done()
    ]
  }) 
  .forResource('anonymous-customers')({
    config: [
      router("/").all().done()
    ]
  }).forResource('products')({
    config: [
      router("/").get().post().done(),
      router("/:id").get().put().delete().done(),
      router("/:id/location/:name").get().done()
    ]
  })
```