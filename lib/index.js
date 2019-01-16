const r = require('./router');
const u = require('./utils');

function Ottis(users) {
  if (!(this instanceof Ottis)) { 
    return new Ottis(users); 
  } 
  if (!users){
    throw new Error('Function requires one argument')
  }
  this.opts = {users:{}}
  this.addUsers(users)
}

Ottis.prototype.addUsers = function(usersArray) {
  if (!usersArray instanceof Array) {
    throw new Error({message:'Argument Passed not Array'})
  } else if (usersArray.length < 1) {
    throw new Error({message:'Array cannot be empty'})
  }
  this.opts.usersArray = usersArray;
  usersArray.forEach(user => {
    // inititalise container for each user
    this.opts['users'][user.toLowerCase()] = {resources:{}};
  });

  return usersArray
}

Ottis.prototype.addConfigFor = function(user) {
  let self = this;
  user = user.toLowerCase();
  if (!self.opts.users[user]) {
    throw new Error(`User <${user}> not found.`)
  };
  let $ = {
    forResource: function(name) {
      name = name.toLowerCase();
      return ({config}) => {
        if (config) {
          self.opts.users[user].resources[name] = {
            config:[...config]
          }
        }
        return $
      }
    }
  };

  return $
}

Ottis.prototype.User = function(user) {
  let self = this;

  if (!user) {
    throw new Error("Function require's one argument")
  } else if (!self.opts.users[user]) {
    throw new Error(`User <${user}> not found.`)
  };

  let $ = {
    canAccess: function({resource, request}){
      // .config[0].regex.pattern.test("/:id")
      const data = self.opts.users[user].resources[resource];
      if (data) {
        // it means at least, config was added for route
        const {config} = data;
        const {method, url} = request;
        for (let i = 0; i < config.length; i++) {
          const c = config[i];
          if (c.regex.pattern.test(url) && c.methods.includes(method)) {
            return true
          } else if (c.regex.pattern.test(url)) {
            return false
          }
        }
        return false
      } else {
        return false
      }
    }
  }

  return $
}

module.exports = Ottis;
module.exports.router = r;