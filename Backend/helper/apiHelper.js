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
  filter() {
    const queryCopy = { ...this.querystr };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]); 
    this.query = this.query.find(queryCopy);
    return this;

  }

  pagination(resultPerPage) {

  if (!this.querystr.page) {
    return this;
  }

  const currentPage =
    Number(this.querystr.page);

  const skip =
    resultPerPage * (currentPage - 1);

  this.query = this.query
    .limit(resultPerPage)
    .skip(skip);

  return this;
}

};

export default ApiHelper;