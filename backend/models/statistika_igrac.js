const mongoose=require('mongoose');

const statistikaIgracaSchema=new mongoose.Schema({
    igrac:{type:mongoose.Schema.Types.ObjectId,ref:'igrac'},
    utakmica:{type:mongoose.Schema.Types.ObjectId,ref:'utakmica'},
    golovi:Number,
    minute_golova:String,
    je_li_pocetna:String,
    minuta_ulaska:Number,
    odigrano_minuta:Number
});

module.exports=mongoose.model('statistika_igrac',statistikaIgracaSchema,'statistika_igraca');