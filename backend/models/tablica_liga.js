const mongoose=require('mongoose');

const tablicaLigeSchema=new mongoose.Schema({
    mjesto_na_tablici:Number,
    klub:{type:mongoose.Schema.Types.ObjectId,ref:'klub'},
    utakmice:Number,
    pobjede:Number,
    izgubljeni_susreti:Number,
    nerijeseno:Number,
    zabijeni_golovi:Number,
    primljeni_golovi:Number,
    gol_razlika:Number,
    broj_bodova:Number
});

module.exports=mongoose.model('tablica_liga',tablicaLigeSchema,'tablica_lige');