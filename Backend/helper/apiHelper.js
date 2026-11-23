const ApiHelper = class {
  constructor(dbquery, querystr) {
    this.query = dbquery;   // Mongoose query object
    this.querystr = querystr;  // Query parameters from the url request
  }
  search(){
    const  keyword  = this.querystr.keyword ? 
    {name : {$regex: this.querystr.keyword, $options: "i"}} 
    : {};
    this.query = this.query.find({...keyword});
    return this;
  }
  filter() {}
  pagination() {}

};

export default ApiHelper;