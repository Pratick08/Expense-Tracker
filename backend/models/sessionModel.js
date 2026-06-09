const {Schema,model} =require('mongoose');
const sessionSchema= new Schema({
    user:{
      type:Schema.Types.ObjectId,
      ref:"users",
      required:true
   },
   refreshTokenHash:{
    type:String,
    required:[true,"refresh token is required"]
   },
   ip:{
    type:String,
    required:[true,"ip address is required"]
   },
   userAgent:{
    type:String,
    required:[true,"User Agent is required"]
   },
   revoked:{
    type:Boolean,
    default:false
   }
},{
    timestamps:true
})

const sessionModel=model('session',sessionSchema);
module.exports=sessionModel;