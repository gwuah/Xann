function Xann({appName}) {
  this.opts = {appName, users:{}}
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
      return ({canAccessAllRoutes, config}) => {
        config.forEach(route => {
          route.methods.map((method) => {
            method.toUpperCase()
          })
        })
        self.opts.users[user].resources[resourceName] = {canAccessAllRoutes, config:[...config]}
        return returnObject
      }
    }
  };

  return returnObject
}


module.exports = Xann;