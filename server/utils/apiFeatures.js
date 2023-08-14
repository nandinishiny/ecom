class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr =queryStr;
    } 
    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,  //for phrase match we don't need whole--we can use '$text' also.
                $options:'i',   //case insensitive
            }
        }:{};
        this.query =this.query.find({...keyword});
        return this; //this allows chaining with the other methods.
    }
    filter(){
        const queryCopy ={...this.queryStr}  //it will take reference object so to stop that we are using spread operator here.
        const removeFields =["keyword","page","limit"];
        removeFields.forEach(key=>{
            delete queryCopy[key]});
        let queryStr =JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)
        this.query=this.query.find(JSON.parse(queryStr));
        return this; 
        //after using this filter I am able to search almost all like name,category all which are defined in schema.
    }
    pagination(resultPerPage){
        const currentPage =Number(this.queryStr.page)||1;
        const skip =resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
export default ApiFeatures;