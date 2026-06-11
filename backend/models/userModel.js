const {Schema,model}=require('mongoose');
const UserSchema=new Schema({
    username:{type:String, required:[true,"Username Required"]},
    email:{type:String,required:[true,"Email is required"]},
    password:{type:String,required:[true,"Password is required"]},
    avatar: {
        type: Number,
        default: 0
    }
},{
    timestamps:true,
})

const UserModel=model("users",UserSchema);
module.exports=UserModel;