const regexparam = require('regexparam');

function router(path) {

  let exportedMethods = [], mainPath = path || "", httpMethods = {
    get: "GET",
    post: "POST",
    delete: "DELETE",
    put: "PUT"
  };

  function updateExportedMethods(method) {
    exportedMethods.push(method)
  }

  const httpMethodsFunc = {
    get(){ 
      updateExportedMethods(httpMethods.get);
      return this
    },
    post(){ 
      updateExportedMethods(httpMethods.post);
      return this
    },
    delete(){ 
      updateExportedMethods(httpMethods.delete);
      return this
    },
    put() { 
      updateExportedMethods(httpMethods.put);
      return this
    },
    all() {
      mainPath = `${mainPath}/*`;
      exportedMethods = Object.values(httpMethods);
      return this.done()
    },
    done() {
      return {
        path:mainPath, 
        regex: regexparam(mainPath),
        methods: exportedMethods
      }
    }
  }
  return httpMethodsFunc
}

module.exports = router;