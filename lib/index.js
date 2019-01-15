const r = require('./router');
const u = require('./utils');

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
    this.opts['users'][user.toLowerCase()] = {resources:{}};
  });

  return usersArray
}

Xann.prototype.addConfigFor = function(user) {
  user = user.toLowerCase();
  let self = this;
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

Xann.prototype.User = function(user) {
  let self = this;
  if (!user) {
    throw new Error("Function require's one argument")
  }
  let $ = {
    canAccess: function({resource, req}){
      // .config[0].regex.pattern.test("/:id")
      const data = self.opts.users[user].resources[resource];
      if (data) {
        // it means at least, config was added for route
        const {config} = data;
        const {method, url} = req;
        for (let i = 0; i < config.length; i++) {
          const c = config[i];

          if (c.regex.pattern.test(url) && c.methods.includes(method)) {
            return true
          } else if (c.regex.pattern.test(url)) {
            return false
          }
        }
      } else {
        return false
      }
      
    }
  }

  return $
}

module.exports = Xann;
module.exports.router = r;