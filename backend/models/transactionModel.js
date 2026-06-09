const {Schema,model}=require('mongoose');

const TransactionSchema=new Schema({
   user:{
      type:Schema.Types.ObjectId,
      ref:"users",
      required:true
   },

   title: {
      type: String,
      required: true
   },

   amount: {
      type: Number,
      required: true
   },

   type: {
      type: String,
      required: true
   },

   category: {
      type: String,
      required: true
   },

   date: {
      type: Date,
      required: true
   }

}, { timestamps: true });

const TransactionModel = model("transaction", TransactionSchema);
module.exports=TransactionModel;
