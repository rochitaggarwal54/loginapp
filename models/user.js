var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
mongoose.connect('mongodb://localhost/nodeauth');
var db=mongoose.connection;
//User schema
var UserSchema=mongoose.Schema({
  username:{
    type:String,
    index:true
  },
  password:{
    type:String
  },
  email:{
    type:String
  },
  name:{
    type:String
  },
  profileimage:{
    type:String
  }
});
var User=module.exports=mongoose.model('User',UserSchema);

module.exports.comparePassword=function(candidatepassword,hash,callback){
  bcrypt.compare(candidatepassword,hash,function(err,isMatch){
    if(err) return callback(err);
    callback(null,isMatch);
  });
}
module.exports.getUserById=function(id,callback){
  User.findById(id,callback);
}
module.exports.getUserByUsername=function(username,callback){
  var query={username:username};
  User.findOne(query,callback);
}
module.exports.createUser=function(newUser,callback)
{
  bcrypt.hash(newUser.password,10,function(err,hash){
    if(err) throw err;
    //set hashed password
    newUser.password=hash;
    //create user
    newUser.save(callback);
  });
}
