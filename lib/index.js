function Xann({users}) {
  if (!(this instanceof Xann)) { 
    return new Xann({users}); 
  } 
  this.opts = {users:{}}
  this.addUsers(users)
}

Xann.prototype.addUsers = function(usersArray) {
  if (!usersArray instanceof Array) {
    throw new Error({message:'Argument Passed not Array'})
  } else if (usersArray.length < 1) {
    throw new Error({message:'Array cannot be empty'})
  }
  this.opts.usersArray = usersArray;
  usersArray.forEach(user => {
    // inititalise container for each user
    this.opts['users'][user.toUpperCase()] = {resources:{}};
  });

  return usersArray
}

Xann.prototype.addConfigFor = function(user) {
  user = user.toUpperCase();
  let self = this;
  let returnObject = {
    forResource: function(resourceName) {
      resourceName = resourceName.toUpperCase();
      return ({config}) => {
        if (config) {
          config.forEach(route => {
            route.methods.map((method) => {
              method.toUpperCase()
            })
          })
          self.opts.users[user].resources[resourceName] = {config:[...config]}
        }
        return returnObject
      }
    }
  };

  return returnObject
}

module.exports = Xann;
const r = require('./router');
module.exports.router = r;