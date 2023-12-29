const  mongoose = require("mongoose")

const StoreSchema = new mongoose.Schema({
    storeId:{
        required:[true,'Please add Store ID'],
        type:String,
        unique:true,
        trim:true,
        maxLen:[10,'ID must be less than 10 chars']
    },
    address:{
        type:String,
        required:[true,"Please add an address"]
    },
    longitude:{
        type:Number,
    },
    latitude:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Store',StoreSchema)