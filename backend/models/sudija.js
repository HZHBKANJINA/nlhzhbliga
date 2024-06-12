const mongoose=require('mongoose');

const sudijaSchema=new mongoose.Schema({
    ime:String,
    prezime:String,
    datum_rodjenja:Date
});

module.exports=mongoose.model('sudija',sudijaSchema,'sudije');