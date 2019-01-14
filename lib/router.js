function router(path) {
  let exportedMethods = [];
  const httpMethods = {
    get: "GET",
    post: "POST",
    delete: "DELETE",
    put: "PUT"
  };
  function updateExport(method) {
    exportedMethods.push(method)
  }
  const httpMethodsFunc = {
    get(){ 
      updateExport(httpMethods.get);
      return this
    },
    post(){ 
      updateExport(httpMethods.post);
      return this
    },
    delete(){ 
      updateExport(httpMethods.delete);
      return this
    },
    put() { 
      updateExport(httpMethods.put);
      return this
    },
    all() { 
      exportedMethods = Object.values(httpMethods);
      return this
    },
    done() {
      return {path, methods: exportedMethods}
    }
  }
  return httpMethodsFunc
}

module.exports = router;