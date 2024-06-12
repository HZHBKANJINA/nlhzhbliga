const mongoose=require('mongoose');

const statistikaKlubaSchema=new mongoose.Schema({
    klub:{type:mongoose.Schema.Types.ObjectId,ref:'klub'},
    utakmica:{type:mongoose.Schema.Types.ObjectId,ref:'utakmica'},
    broj_golova:Number,
    zajedja:Number,
    korneri:Number
});

module.exports=mongoose.model('statistika_klub',statistikaKlubaSchema,'statistika_momcadi');