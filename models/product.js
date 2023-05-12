const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , 'the product must have a name']
    },
    price:{
        type:Number,
        required:[true , 'the price must have a name']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rate:{
        type:Number,
        default:4.5
    },
    creatAt:{
        type:Date,
        default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['marcos','liddy','ikea','caressa'],
            message:'{VALUES} is not supported'
        }

        }
        //['marcos','liddy','ikea','caressa']
    ,
})

module.exports = mongoose.model('product',productSchema);