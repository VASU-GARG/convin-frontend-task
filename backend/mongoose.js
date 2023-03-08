var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Vasu:Vasu@cluster0.6vuhk.mongodb.net/CONVIN?retryWrites=true&w=majority");

collectionSchema = mongoose.Schema({
        name:String,
        email:String,
        password:String,
        buckets:Array,
        history:Array
});

collectionModel = mongoose.model('users',collectionSchema);

module.exports = collectionModel;